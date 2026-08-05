// 2026-08-06 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.06';

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
// 1. SPCX Moon factory + Starship 1/day
{file:'spcx-moon-factory-starship-daily',symbol:'SPCX',
 ko:{title:'SPCX — Moon Factory 계획·humanoid robots로 달 base 확장·Starship 내년까지 1일 1회 발사 목표',heroIcon:'🌙',heroBig:'MOON',heroSub:'Kalshi/DogeDesigner: SpaceX가 humanoid robots 활용해 달에 factory 배치 계획·NASA Admin Jared "Starship 재사용성으로 Moon base가 small city로 확장 가능"·Polymarket: Starship 내년까지 하루 1회 발사 목표',
  cards:[{icon:'🌙',big:'Moon Factory',mid:'humanoid robots',sub:'달 표면 배치 계획'},{icon:'🏗️',big:'Moon Base',mid:'small city 확장',sub:'NASA Admin Jared'},{icon:'🚀',big:'1/day',mid:'Starship 발사',sub:'내년까지'}],
  quoteLabel:'KALSHI · NASA · POLYMARKET',quoteKo:'"reusable rockets로 Moon base 구축·small city까지 확장 가능·Starship 내년 하루 1회 발사"',quoteEn:'"Reusable rockets to build Moon base · small city expansion possible · Starship 1 flight/day by next year"',
  source:'출처: Kalshi·DogeDesigner·NASA·Polymarket·2026.08.05',
  noteHead:'왜 중요한가: 8/5 Musk 12-24개월 +TSLA 매출·NVDA Starmind exclusive 프레임의 실 미션 축·화성/달 문명 실체 시나리오',noteSub:'앞으로 볼 것: Starship V3 상용 발사 페이스·Moon factory 실 배치·humanoid robots 우주 활용',footer:'SPCX Moon · Starship 1/day',brand:BK},
 en:{title:'SPCX — Moon Factory Plans · Humanoid Robots for Lunar Base · Starship Targeting 1 Flight/Day by Next Year',heroIcon:'🌙',heroBig:'MOON',heroSub:'Kalshi/DogeDesigner: SpaceX plans to deploy factories on Moon using humanoid robots · NASA Admin Jared "Starship reusability enables Moon base expansion to small city" · Polymarket: Starship targeting 1 flight/day by next year',
  cards:[{icon:'🌙',big:'Moon Factory',mid:'Humanoid robots',sub:'Lunar surface deployment'},{icon:'🏗️',big:'Moon Base',mid:'Small city expansion',sub:'NASA Admin Jared'},{icon:'🚀',big:'1/day',mid:'Starship launches',sub:'By next year'}],
  quoteLabel:'KALSHI · NASA · POLYMARKET',quoteKo:'"reusable rockets·Moon base·small city 확장·1 flight/day"',quoteEn:'"Reusable rockets to build Moon base · small city expansion possible · Starship 1 flight/day by next year"',
  source:'Source: Kalshi·DogeDesigner·NASA·Polymarket·2026.08.05',
  noteHead:'Why: Real mission axis of 8/5 Musk 12-24 mo +TSLA revenue and NVDA Starmind exclusive · Mars/Moon civilization substance scenario',noteSub:'Watch: Starship V3 commercial launch pace · Moon factory deployment · humanoid robots in space',footer:'SPCX Moon · Starship 1/day',brand:BE}},

// 2. SPCX price -10% after earnings
{file:'spcx-price-drop-10pct-capex-54b',symbol:'SPCX',
 ko:{title:'SPCX — Q2 실적 후 시세 -10% 하락·CAPEX $5.4B/분기 시장 우려·현재 $111·IPO 하회·락업 내일 만료',heroIcon:'📉',heroBig:'-10 %',heroSub:'Bull Theory: SPCX Revenue $7.8B(컨센 $6.81B, +92% YoY)·Starlink 1200만 구독자·그러나 CAPEX $5.4B/분기 급증(AI 인프라)이 시장 우려·현재 $111·IPO 가($150) 하회·락업 내일 만료로 20% shares 유통 임박',
  cards:[{icon:'📉',big:'-10 %',mid:'실적 후 시세',sub:'$111 현재가'},{icon:'💸',big:'$5.4 B',mid:'CAPEX/분기',sub:'AI 인프라 급증'},{icon:'🔓',big:'내일 만료',mid:'락업 해제',sub:'20% shares 유통'}],
  quoteLabel:'BULL THEORY · MUSK',quoteKo:'"시장이 profit 요구·Musk가 $1T annual revenue by 2028 목표 forward·CAPEX가 문제"',quoteEn:'"Market wants profit · Musk pulled target forward: $1T revenue by 2028 · problem was capex"',
  source:'출처: Bull Theory·Elon Musk·2026.08.05',
  noteHead:'왜 중요한가: 실적 대박에도 CAPEX 급증이 시세 하락·8/5 Musk $100 insane 매수 발언과 정합·락업 내일 만료가 추가 압박',noteSub:'앞으로 볼 것: 락업 후 시세 반응·CAPEX 회수 시점·$1T by 2028 목표 실현',footer:'SPCX -10% · CAPEX $5.4B · 락업 내일',brand:BK},
 en:{title:'SPCX — Price Drops -10% After Q2 · CAPEX $5.4B/Q Concerns · $111 Current · Below IPO · Lockup Tomorrow',heroIcon:'📉',heroBig:'-10 %',heroSub:'Bull Theory: SPCX Revenue $7.8B(est $6.81B, +92% YoY) · Starlink 12M subscribers · but CAPEX $5.4B/quarter surge (AI infra) concerns market · $111 current · below $150 IPO · lockup expires tomorrow releasing 20% shares',
  cards:[{icon:'📉',big:'-10 %',mid:'Post-earnings price',sub:'$111 current'},{icon:'💸',big:'$5.4 B',mid:'CAPEX/Q',sub:'AI infra surge'},{icon:'🔓',big:'Tomorrow expires',mid:'Lockup release',sub:'20% shares'}],
  quoteLabel:'BULL THEORY · MUSK',quoteKo:'"시장 profit 요구·Musk $1T by 2028"',quoteEn:'"Market wants profit · Musk pulled target forward: $1T revenue by 2028 · problem was capex"',
  source:'Source: Bull Theory · Elon Musk · 2026.08.05',
  noteHead:'Why: Despite earnings blowout, CAPEX surge drops price · consistent with 8/5 Musk $100 insane buy statement · lockup tomorrow adds pressure',noteSub:'Watch: Post-lockup price reaction · CAPEX payback timing · $1T by 2028 realization',footer:'SPCX -10% · CAPEX $5.4B · Lockup tomorrow',brand:BE}},

// 3. Gene Munster 5x above estimates
{file:'spcx-munster-5x-estimates-10b-runrate',symbol:'SPCX',
 ko:{title:'SPCX — Gene Munster "실적이 애널 예상 5배·연말 $10B revenue run rate·12월 $22B(6월 $17B에서 +17%)"',heroIcon:'📊',heroBig:'5 ×',heroSub:'Gene Munster: SPCX Q2 실적이 애널 예상을 5배 초과·회사가 연말 $10B 실적 run rate 가이던스 유지 시 12월 분기 $22B 매출 필요·6월 $17B에서 +17% 상승',
  cards:[{icon:'📊',big:'5 ×',mid:'애널 예상 초과',sub:'Munster'},{icon:'💰',big:'$10 B',mid:'연말 run rate',sub:'회사 가이던스'},{icon:'📈',big:'$22 B',mid:'12월 분기 매출',sub:'6월 $17B → +17%'}],
  quoteLabel:'GENE MUNSTER',quoteKo:'"SPCX 실적이 애널 예상 5배·연말 run rate $10B·12월 $22B 필요"',quoteEn:'"SPCX earnings 5× above analyst estimates · $10B year-end run rate · $22B needed in December quarter"',
  source:'출처: Gene Munster · 2026.08.05',
  noteHead:'왜 중요한가: 실적 대박의 규모 실체·5배 초과는 예외적·연말 매출 급증 시나리오',noteSub:'앞으로 볼 것: 12월 실 매출·연말 $10B run rate 실현',footer:'SPCX Munster · 5× 예상 · $22B 12월',brand:BK},
 en:{title:'SPCX — Gene Munster "Earnings 5× Above Estimates · $10B Year-End Run Rate · $22B in December (from $17B in June, +17%)"',heroIcon:'📊',heroBig:'5 ×',heroSub:'Gene Munster: SPCX Q2 earnings exceeded analyst estimates by 5× · company guidance implies $22B December-quarter revenue for $10B year-end run rate · +17% from $17B reported in June',
  cards:[{icon:'📊',big:'5 ×',mid:'Above estimates',sub:'Munster'},{icon:'💰',big:'$10 B',mid:'Year-end run rate',sub:'Company guidance'},{icon:'📈',big:'$22 B',mid:'Dec quarter revenue',sub:'From $17B June, +17%'}],
  quoteLabel:'GENE MUNSTER',quoteKo:'"5× 예상·$10B run rate·$22B 12월"',quoteEn:'"SPCX earnings 5× above analyst estimates · $10B year-end run rate · $22B needed in December quarter"',
  source:'Source: Gene Munster · 2026.08.05',
  noteHead:'Why: Substance of earnings blowout magnitude · 5× exceed is exceptional · year-end revenue surge scenario',noteSub:'Watch: December actual revenue · year-end $10B run rate realization',footer:'SPCX Munster · 5× est · $22B Dec',brand:BE}},

// 4. Starlink V3 + Mobile 4G challenge V/T/TMO
{file:'spcx-starlink-v3-mobile-600b-vtc',symbol:'SPCX',
 ko:{title:'SPCX — Starlink V3 gigabit + Mobile 4G on any phone 100+ 국가·Shotwell "V/T/TMO $600B 시장 도전"',heroIcon:'📡',heroBig:'$600 B',heroSub:'WMC/Sawyer Merritt (Gwynne Shotwell): Starlink V3가 Earth 어디서든 gigabit speed·Starlink Mobile이 100+ 국가 어떤 폰에서든 4G level speeds·Verizon·AT&T·T-Mobile 합계 $600B/년 시장 도전·"기존 인터넷의 backup provider"',
  cards:[{icon:'📶',big:'gigabit',mid:'Starlink V3',sub:'Earth 어디서든'},{icon:'📱',big:'100+ 국가',mid:'Mobile 4G on phone',sub:'어떤 폰에서든'},{icon:'💰',big:'$600 B',mid:'V/T/TMO 시장',sub:'연 도전 규모'}],
  quoteLabel:'GWYNNE SHOTWELL · WMC',quoteKo:'"V·T·TMO 합계 $600B/년·꽤 많은 고객 확보 예상·dead zones 제거·natural disaster에서 우수"',quoteEn:'"V·T·TMO combined $600B/year · I anticipate acquiring quite a few customers · eliminate dead zones · better in natural disasters"',
  source:'출처: Whole Mars Catalog·Sawyer Merritt·Gwynne Shotwell·2026.08.05',
  noteHead:'왜 중요한가: 8/5 Starlink 90% 매출·오늘 Viasat 붕괴와 결합·Starlink Mobile이 US Telco 시장 실 도전',noteSub:'앞으로 볼 것: Starlink Mobile 실 가입자·V·T·TMO 시장 점유율·해외 확대',footer:'SPCX Starlink V3·Mobile·$600B',brand:BK},
 en:{title:'SPCX — Starlink V3 Gigabit + Mobile 4G on Any Phone in 100+ Countries · Shotwell "V/T/TMO $600B Market Challenge"',heroIcon:'📡',heroBig:'$600 B',heroSub:'WMC/Sawyer Merritt (Gwynne Shotwell): Starlink V3 delivers gigabit speeds anywhere on Earth · Starlink Mobile supports 4G-level speeds on any phone in 100+ countries · challenges Verizon/AT&T/T-Mobile combined $600B/year market · "backup provider to primary internet"',
  cards:[{icon:'📶',big:'Gigabit',mid:'Starlink V3',sub:'Anywhere on Earth'},{icon:'📱',big:'100+ countries',mid:'Mobile 4G on phone',sub:'Any phone'},{icon:'💰',big:'$600 B',mid:'V/T/TMO market',sub:'Annual challenge'}],
  quoteLabel:'GWYNNE SHOTWELL · WMC',quoteKo:'"V·T·TMO $600B/년·많은 고객 확보"',quoteEn:'"V·T·TMO combined $600B/year · I anticipate acquiring quite a few customers · eliminate dead zones · better in natural disasters"',
  source:'Source: Whole Mars Catalog·Sawyer Merritt·Gwynne Shotwell·2026.08.05',
  noteHead:'Why: Combined with 8/5 Starlink 90% revenue and today Viasat collapse · Starlink Mobile real challenge to US Telco market',noteSub:'Watch: Starlink Mobile actual subscribers · V/T/TMO market share · overseas expansion',footer:'SPCX Starlink V3·Mobile·$600B',brand:BE}},

// 5. Viasat -8% subs · Starlink 10-20x edge
{file:'viasat-8pct-subs-loss-starlink-edge',symbol:'SPCX',
 ko:{title:'SPCX — Viasat 8% broadband subs 상실·115K로 축소(2020 690K→)·V2 100Mbps 계획했으나 Starlink 대비 10-20배 느림',heroIcon:'📉',heroBig:'-83 %',heroSub:'Sawyer Merritt: Viasat 미국 fixed broadband 가입자가 8% 감소·115K로 축소(2020 690K에서 -83%)·Q2 -15K subs·Starlink 서비스 개시 이후 지속 이탈·V2 100+ Mbps 계획이지만 Starlink 대비 10-20배 느림',
  cards:[{icon:'📉',big:'690K → 115K',mid:'Viasat subs',sub:'2020 → 오늘'},{icon:'🚀',big:'10-20×',mid:'Starlink 우위',sub:'속도 배수'},{icon:'📊',big:'-15K Q2',mid:'추가 이탈',sub:'가입자 감소'}],
  quoteLabel:'SAWYER MERRITT',quoteKo:'"Viasat Q2에 -15K subs·Starlink 시작 이후 8% 이탈·V2 위성도 Starlink 10-20배 느림"',quoteEn:'"Viasat lost 15K subs in Q2 · 8% loss since Starlink launched · V2 satellite 10-20× slower than Starlink"',
  source:'출처: Sawyer Merritt·2026.08.05',
  noteHead:'왜 중요한가: 오늘 Starlink Mobile V/T/TMO 도전과 결합·8/5 Hughesnet Chapter 11과 함께 위성 인터넷 시장 재편',noteSub:'앞으로 볼 것: 다른 위성 인터넷 경쟁사 상황·V2 실 발사·Starlink 시장 지배',footer:'SPCX vs Viasat · 10-20× 우위',brand:BK},
 en:{title:'SPCX — Viasat Loses 8% Broadband Subs · Down to 115K (from 690K in 2020) · V2 100Mbps Planned But 10-20× Slower Than Starlink',heroIcon:'📉',heroBig:'-83 %',heroSub:'Sawyer Merritt: Viasat US fixed broadband subscribers down 8% · 115K (from 690K in 2020, -83%) · Q2 lost 15K more · continued departures since Starlink service launch · V2 100+ Mbps planned but 10-20× slower than Starlink',
  cards:[{icon:'📉',big:'690K → 115K',mid:'Viasat subs',sub:'2020 → today'},{icon:'🚀',big:'10-20×',mid:'Starlink edge',sub:'Speed multiple'},{icon:'📊',big:'-15K Q2',mid:'Additional loss',sub:'Subscriber decline'}],
  quoteLabel:'SAWYER MERRITT',quoteKo:'"Viasat Q2 -15K·8% 이탈·V2 10-20배 느림"',quoteEn:'"Viasat lost 15K subs in Q2 · 8% loss since Starlink launched · V2 satellite 10-20× slower than Starlink"',
  source:'Source: Sawyer Merritt·2026.08.05',
  noteHead:'Why: Combined with today Starlink Mobile V/T/TMO challenge · with 8/5 Hughesnet Chapter 11 · satellite internet market reshaping',noteSub:'Watch: Other satellite internet competitor status · V2 actual launch · Starlink market dominance',footer:'SPCX vs Viasat · 10-20× edge',brand:BE}},

// 6. NVDA exclusive + new hyperscalers lock-in
{file:'nvda-exclusive-new-hyperscalers-20x-pe',symbol:'NVDA',
 ko:{title:'NVDA — SPCX exclusive + 신 hyperscalers(SBGX·CRWV·NBIS) NVDA 종속·20x P/E 재평가 논거',heroIcon:'👑',heroBig:'20 × P/E',heroSub:'Oguz Erkan: Musk가 SPCX가 NVDA GPU exclusive 사용 선언 → SBGX·CRWV·NBIS 등 신 hyperscalers도 NVDA 종속·custom ASIC 개발보다 GPU 구매가 TCO 우위·NVDA 20x forward P/E 재평가 필요',
  cards:[{icon:'🎯',big:'Exclusive',mid:'SPCX + SBGX·CRWV·NBIS',sub:'NVDA 종속'},{icon:'💰',big:'TCO 우위',mid:'GPU vs custom ASIC',sub:'신 hyperscalers 선택'},{icon:'📈',big:'20 × P/E',mid:'재평가 필요',sub:'인퍼런스 점유율'}],
  quoteLabel:'OGUZ ERKAN · ELON MUSK',quoteKo:'"SPCX는 NVDA GPU exclusive 커밋·최고이기 때문·신 hyperscalers도 GPU에 lock in"',quoteEn:'"SpaceX committed to using Nvidia GPUs exclusively because they are the best · new hyperscalers lock in to GPUs"',
  source:'출처: Oguz Erkan·Elon Musk·2026.08.05',
  noteHead:'왜 중요한가: 8/5 SPCX-NVDA Starmind exclusive 파트너십의 시장 파급·다른 hyperscalers도 NVDA 종속 시나리오',noteSub:'앞으로 볼 것: 다른 hyperscalers 실 GPU 채택·NVDA 시장 점유율·NVDA 20x P/E 재평가',footer:'NVDA · exclusive · 20x P/E',brand:BK},
 en:{title:'NVDA — SPCX Exclusive + New Hyperscalers (SBGX·CRWV·NBIS) Lock-In · 20x P/E Re-Rating Argument',heroIcon:'👑',heroBig:'20 × P/E',heroSub:'Oguz Erkan: Musk announced SPCX will use NVDA GPUs exclusively → SBGX/CRWV/NBIS and other new hyperscalers also NVDA lock-in · GPU purchase beats custom ASIC development on TCO · NVDA 20× forward P/E re-rating needed',
  cards:[{icon:'🎯',big:'Exclusive',mid:'SPCX + SBGX·CRWV·NBIS',sub:'NVDA lock-in'},{icon:'💰',big:'TCO edge',mid:'GPU vs custom ASIC',sub:'New hyperscalers choose'},{icon:'📈',big:'20× P/E',mid:'Re-rating needed',sub:'Inference share'}],
  quoteLabel:'OGUZ ERKAN · ELON MUSK',quoteKo:'"SPCX NVDA GPU exclusive·신 hyperscalers도 GPU lock-in"',quoteEn:'"SpaceX committed to using Nvidia GPUs exclusively because they are the best · new hyperscalers lock in to GPUs"',
  source:'Source: Oguz Erkan·Elon Musk·2026.08.05',
  noteHead:'Why: Market ripple of 8/5 SPCX-NVDA Starmind exclusive partnership · other hyperscalers NVDA lock-in scenario',noteSub:'Watch: Other hyperscalers actual GPU adoption · NVDA market share · NVDA 20× P/E re-rating',footer:'NVDA · exclusive · 20x P/E',brand:BE}},

// 7. SPCX blackout 71.5M shares redeemed
{file:'spcx-blackout-71m-shares-freefloat',symbol:'SPCX',
 ko:{title:'SPCX — 락업 blackout 71.5M shares 상환·free float 4.9%→11.8%·거래일 락업 완화',heroIcon:'🔓',heroBig:'71.5 M',heroSub:'BREAKING: 락업 blackout 기간 동안 SPCX 71.5M shares 상환·38.9M outstanding shares 대비 62% 규모·free float 4.9%에서 11.8%로 확대·내일 락업 만료 시 추가 유통 완화',
  cards:[{icon:'🔓',big:'71.5 M',mid:'blackout 상환',sub:'shares 환수'},{icon:'📊',big:'62 %',mid:'outstanding 대비',sub:'상환 비율'},{icon:'📈',big:'4.9→11.8 %',mid:'free float 확대',sub:'유통 증가'}],
  quoteLabel:'BREAKING',quoteKo:'"71.5M shares blackout 기간 상환·38.9M outstanding shares 대비 62%·free float 4.9%→11.8%"',quoteEn:'"71.5M shares redeemed during blackout · 62% of 38.9M outstanding · free float 4.9% → 11.8%"',
  source:'출처: BREAKING·2026.08.05',
  noteHead:'왜 중요한가: 8/5 락업 8/6 만료·오늘 실적 후 -10% 시세와 결합·free float 확대가 유동성 개선·시세 압박 완화',noteSub:'앞으로 볼 것: 8/6 실 락업 후 시세·40% 유통까지 12월·기관 flow',footer:'SPCX 락업·71.5M·free float 11.8%',brand:BK},
 en:{title:'SPCX — 71.5M Shares Redeemed During Lockup Blackout · Free Float 4.9% → 11.8% · Lockup Trading Eased',heroIcon:'🔓',heroBig:'71.5 M',heroSub:'BREAKING: 71.5M SPCX shares redeemed during lockup blackout · 62% of 38.9M outstanding shares · free float expands from 4.9% to 11.8% · lockup expiration tomorrow releases additional shares with reduced pressure',
  cards:[{icon:'🔓',big:'71.5 M',mid:'Blackout redemption',sub:'Shares recovered'},{icon:'📊',big:'62 %',mid:'vs outstanding',sub:'Redemption ratio'},{icon:'📈',big:'4.9→11.8 %',mid:'Free float expansion',sub:'Liquidity increase'}],
  quoteLabel:'BREAKING',quoteKo:'"71.5M blackout 상환·free float 4.9%→11.8%"',quoteEn:'"71.5M shares redeemed during blackout · 62% of 38.9M outstanding · free float 4.9% → 11.8%"',
  source:'Source: BREAKING·2026.08.05',
  noteHead:'Why: Combined with 8/5 lockup 8/6 expiration · today\'s post-earnings -10% price · free float expansion improves liquidity · price pressure eased',noteSub:'Watch: 8/6 actual post-lockup price · 40% float by December · institutional flow',footer:'SPCX Lockup · 71.5M · Free Float 11.8%',brand:BE}},

// 8. SPCX $295M Tesla stocks + $500M Megapacks
{file:'spcx-295m-tesla-500m-megapacks',symbol:'SPCX',
 ko:{title:'SPCX — Q2 $295M Tesla stocks 취득·$500M Megapacks datacenter·Tesla-SPCX 상호 지분·10-Q 공시',heroIcon:'🔗',heroBig:'$295 M',heroSub:'Sawyer Merritt (10-Q 공시): SpaceX가 Q2 2026에 Tesla stocks $295M 취득·datacenter용 Megapacks에 지난해 총 $500M 지출·Tesla-SPCX 상호 지분 관계 확대',
  cards:[{icon:'🔗',big:'$295 M',mid:'Tesla stocks 취득',sub:'SPCX Q2 2026'},{icon:'🔋',big:'$500 M',mid:'Megapacks datacenter',sub:'지난해 총 지출'},{icon:'🤝',big:'상호 지분',mid:'Tesla ↔ SPCX',sub:'통합 심화'}],
  quoteLabel:'SAWYER MERRITT · SPCX 10-Q',quoteKo:'"SPCX Q2에 Tesla stocks $295M 취득·Megapacks datacenter $500M 지출·10-Q 공시"',quoteEn:'"SpaceX acquired $295M Tesla stocks in Q2 · spent $500M on Megapacks for datacenters · per 10-Q filing"',
  source:'출처: Sawyer Merritt·SpaceX 10-Q·2026.08.05',
  noteHead:'왜 중요한가: 8/5 SPCX Starmind exclusive·오늘 실적 후 Tesla-SPCX 통합 실체·8/3 Kalshi 60% 합병 확률 프레임과 정합',noteSub:'앞으로 볼 것: SPCX Tesla stocks 추가 취득·Megapacks 대량 배치·합병 시나리오 진전',footer:'SPCX·Tesla·$295M·$500M',brand:BK},
 en:{title:'SPCX — Q2 Acquired $295M in Tesla Stocks · $500M Megapacks for Datacenters · Tesla-SPCX Mutual Stake · 10-Q Filing',heroIcon:'🔗',heroBig:'$295 M',heroSub:'Sawyer Merritt (10-Q filing): SpaceX acquired $295M in Tesla stocks in Q2 2026 · spent total $500M on Megapacks for datacenters over past year · Tesla-SPCX mutual stake relationship expansion',
  cards:[{icon:'🔗',big:'$295 M',mid:'Tesla stocks acquired',sub:'SPCX Q2 2026'},{icon:'🔋',big:'$500 M',mid:'Megapacks datacenter',sub:'Past year total'},{icon:'🤝',big:'Mutual stake',mid:'Tesla ↔ SPCX',sub:'Integration deepens'}],
  quoteLabel:'SAWYER MERRITT · SPCX 10-Q',quoteKo:'"$295M Tesla stocks·$500M Megapacks"',quoteEn:'"SpaceX acquired $295M Tesla stocks in Q2 · spent $500M on Megapacks for datacenters · per 10-Q filing"',
  source:'Source: Sawyer Merritt · SpaceX 10-Q · 2026.08.05',
  noteHead:'Why: 8/5 SPCX Starmind exclusive · post-earnings Tesla-SPCX integration substance · consistent with 8/3 Kalshi 60% merger probability frame',noteSub:'Watch: SPCX additional Tesla stock acquisition · Megapacks large deployment · merger scenario progress',footer:'SPCX·Tesla·$295M·$500M',brand:BE}},

// 9. Trump 'WE LOVE ELON MUSK'
{file:'trump-love-elon-musk-relationship',symbol:'MACRO',
 ko:{title:'매크로 — Trump "WE LOVE ELON MUSK" 공개 발언·Musk-Trump 관계 회복 시그널',heroIcon:'🤝',heroBig:'LOVE',heroSub:'Evan D BREAKING: PRESIDENT TRUMP JUST SAID "WE LOVE ELON MUSK"·이전 Musk-Trump 불화 이후 관계 회복 시그널·SPCX 실적·NASA·정부 계약과 결합해 정치 우호 재확인',
  cards:[{icon:'🤝',big:'LOVE',mid:'Trump 발언',sub:'공개 성명'},{icon:'🔄',big:'회복',mid:'Musk-Trump 관계',sub:'이전 불화 후'},{icon:'🏛️',big:'정치 우호',mid:'SPCX·NASA·정부',sub:'재확인'}],
  quoteLabel:'PRESIDENT TRUMP · EVAN D',quoteKo:'"WE LOVE ELON MUSK — 대통령 성명"',quoteEn:'"WE LOVE ELON MUSK — Presidential statement"',
  source:'출처: Evan D·President Trump·2026.08.05',
  noteHead:'왜 중요한가: SPCX·TSLA 정부 계약 우위·NASA Moon base·NHTSA Cybercab 규제 우위 지속에 우호 환경',noteSub:'앞으로 볼 것: Trump-Musk 협업 확대·정부 계약 추가·규제 완화',footer:'MACRO Trump · WE LOVE ELON',brand:BK},
 en:{title:'MACRO — Trump "WE LOVE ELON MUSK" Public Statement · Musk-Trump Relationship Recovery Signal',heroIcon:'🤝',heroBig:'LOVE',heroSub:'Evan D BREAKING: PRESIDENT TRUMP JUST SAID "WE LOVE ELON MUSK" · relationship recovery signal after prior Musk-Trump discord · combined with SPCX earnings/NASA/government contracts confirms political favor',
  cards:[{icon:'🤝',big:'LOVE',mid:'Trump statement',sub:'Public'},{icon:'🔄',big:'Recovery',mid:'Musk-Trump relations',sub:'After prior discord'},{icon:'🏛️',big:'Political favor',mid:'SPCX·NASA·govt',sub:'Reaffirmed'}],
  quoteLabel:'PRESIDENT TRUMP · EVAN D',quoteKo:'"WE LOVE ELON MUSK"',quoteEn:'"WE LOVE ELON MUSK — Presidential statement"',
  source:'Source: Evan D · President Trump · 2026.08.05',
  noteHead:'Why: Favorable environment for SPCX/TSLA govt contract edge · NASA Moon base · NHTSA Cybercab regulatory edge continuity',noteSub:'Watch: Trump-Musk collaboration expansion · additional government contracts · regulatory easing',footer:'MACRO Trump · WE LOVE ELON',brand:BE}},

// 10. GOOGL surpasses AAPL market cap
{file:'googl-surpasses-aapl-2nd-largest',symbol:'GOOGL',
 ko:{title:'GOOGL — 시가총액 AAPL 초과·세계 2위 (NVIDIA 다음)',heroIcon:'🥈',heroBig:'#2',heroSub:'Evan D: Google이 AAPL 초과 시가총액으로 마감·세계 2위 기업 (NVIDIA 다음)·AI·Cloud·Search·YouTube·Waymo 다각 성장·8/4 Anthropic $53.4B 지분·8/5 Search 매출 AMZN 1P 85% 프레임 실체화',
  cards:[{icon:'🥈',big:'#2',mid:'세계 시가총액',sub:'NVIDIA 다음'},{icon:'📈',big:'AAPL 초과',mid:'Google 상승',sub:'2위 이동'},{icon:'💰',big:'AI·Cloud',mid:'다각 성장 축',sub:'Anthropic·Search·YouTube'}],
  quoteLabel:'EVAN D',quoteKo:'"Google이 AAPL 초과·세계 2위 기업(NVIDIA 다음)"',quoteEn:'"Google surpassed AAPL market cap · 2nd largest company in world (behind only NVIDIA)"',
  source:'출처: Evan D·2026.08.05',
  noteHead:'왜 중요한가: GOOGL의 mega-cap 지위 재확인·8/4 Search 매출 AMZN 1P 85%·오늘 DeepMind CEO 이동과 결합',noteSub:'앞으로 볼 것: NVIDIA 지위 유지·GOOGL vs AAPL 격차·Anthropic·Waymo 매출',footer:'GOOGL · #2 · AAPL 초과',brand:BK},
 en:{title:'GOOGL — Market Cap Surpasses AAPL · 2nd Largest Company in World (Behind Only NVIDIA)',heroIcon:'🥈',heroBig:'#2',heroSub:'Evan D: Google closed with larger market cap than AAPL · 2nd largest company in world (behind only NVIDIA) · AI/Cloud/Search/YouTube/Waymo multi-axis growth · substantiates 8/4 Anthropic $53.4B stake and 8/5 Search 85% of AMZN 1P frames',
  cards:[{icon:'🥈',big:'#2',mid:'World market cap',sub:'Behind NVIDIA'},{icon:'📈',big:'Surpassed AAPL',mid:'Google rise',sub:'#2 shift'},{icon:'💰',big:'AI·Cloud',mid:'Multi-axis growth',sub:'Anthropic·Search·YouTube'}],
  quoteLabel:'EVAN D',quoteKo:'"Google이 AAPL 초과·세계 2위"',quoteEn:'"Google surpassed AAPL market cap · 2nd largest company in world (behind only NVIDIA)"',
  source:'Source: Evan D·2026.08.05',
  noteHead:'Why: GOOGL mega-cap reaffirmed · combined with 8/4 Search 85% AMZN 1P and today DeepMind CEO transition',noteSub:'Watch: NVIDIA position maintenance · GOOGL vs AAPL gap · Anthropic/Waymo revenue',footer:'GOOGL · #2 · surpassed AAPL',brand:BE}},

// 11. GOOGL DeepMind Hassabis Chairman + Dean depart
{file:'googl-deepmind-hassabis-dean-departure',symbol:'GOOGL',
 ko:{title:'GOOGL — DeepMind CEO Demis Hassabis Chairman 이동·Chief Scientist Jeff Dean 15년 퇴사·신 AI 스타트업 (Bloomberg)',heroIcon:'👥',heroBig:'2 인사',heroSub:'Bloomberg: Google DeepMind CEO Demis Hassabis가 day-to-day CEO에서 Chairman 이동·별개로 Chief Scientist Jeff Dean이 15년 만에 Google 퇴사·과학 발견 focus 신 AI 스타트업 창업',
  cards:[{icon:'👑',big:'Hassabis',mid:'CEO → Chairman',sub:'DeepMind 이동'},{icon:'🚪',big:'Jeff Dean',mid:'15년 근무 후 퇴사',sub:'Chief Scientist'},{icon:'🚀',big:'과학 스타트업',mid:'Dean 신 창업',sub:'AI 과학 발견'}],
  quoteLabel:'BLOOMBERG',quoteKo:'"Hassabis Chairman 이동·Jeff Dean 15년 후 퇴사·과학 발견 AI 스타트업 창업"',quoteEn:'"Hassabis moves to Chairman · Jeff Dean leaves after 15 years · launching AI startup for scientific discovery"',
  source:'출처: Bloomberg·2026.08.05',
  noteHead:'왜 중요한가: GOOGL AI 리더십 인사 대변동·오늘 시총 AAPL 초과 시점에 나온 리스크 시그널',noteSub:'앞으로 볼 것: 신 DeepMind CEO·Jeff Dean 신 스타트업·다른 GOOGL 핵심 인력 이탈',footer:'GOOGL · Hassabis·Dean 인사',brand:BK},
 en:{title:'GOOGL — DeepMind CEO Demis Hassabis Moves to Chairman · Chief Scientist Jeff Dean Departs After 15 Years · New AI Startup (Bloomberg)',heroIcon:'👥',heroBig:'2 personnel',heroSub:'Bloomberg: Google DeepMind CEO Demis Hassabis moves from day-to-day CEO to Chairman · separately Chief Scientist Jeff Dean leaves Google after 15 years to launch AI startup focused on scientific discovery',
  cards:[{icon:'👑',big:'Hassabis',mid:'CEO → Chairman',sub:'DeepMind transition'},{icon:'🚪',big:'Jeff Dean',mid:'Departs after 15 years',sub:'Chief Scientist'},{icon:'🚀',big:'Science startup',mid:'Dean new venture',sub:'AI scientific discovery'}],
  quoteLabel:'BLOOMBERG',quoteKo:'"Hassabis Chairman·Dean 15년 후 퇴사"',quoteEn:'"Hassabis moves to Chairman · Jeff Dean leaves after 15 years · launching AI startup for scientific discovery"',
  source:'Source: Bloomberg·2026.08.05',
  noteHead:'Why: Major GOOGL AI leadership personnel changes · risk signal at time of market cap surpassing AAPL today',noteSub:'Watch: New DeepMind CEO · Jeff Dean new startup · other GOOGL key personnel departures',footer:'GOOGL · Hassabis·Dean personnel',brand:BE}},

// 12. TSLA Model Y L review
{file:'tsla-model-y-l-review-325-miles',symbol:'TSLA',
 ko:{title:'TSLA — Edmunds 신 Model Y L 리뷰 대박·서스펜션·325 miles·FSD 포함·3열 SUV 대안',heroIcon:'🚙',heroBig:'325 mi',heroSub:'The Tesla Newsview: Edmunds가 신 Model Y L 리뷰·Adaptive 서스펜션 부드러운 승차감·조용한 캐빈·프리미엄 인테리어·3열 head room·325 miles EPA range·FSD Supervised 포함·큰 3-row SUV 대안 프레임',
  cards:[{icon:'🚙',big:'325 miles',mid:'EPA range',sub:'Model Y L'},{icon:'🛋️',big:'3열',mid:'head room 개선',sub:'큰 SUV 대안'},{icon:'⚡',big:'0-40 4.4s',mid:'가속',sub:'FSD 포함'}],
  quoteLabel:'EDMUNDS · THE TESLA NEWSVIEW',quoteKo:'"Model Y L은 큰 3-row SUV의 compelling 대안·Tesla 특유 driving dynamics 유지"',quoteEn:'"Model Y L is a compelling alternative to larger three-row SUVs while retaining Tesla driving dynamics"',
  source:'출처: The Tesla Newsview·Edmunds·2026.08.05',
  noteHead:'왜 중요한가: TSLA 제품 다각화·8/5 China 93K·오늘 삼성/LG Cybercab 계약과 결합해 판매 축 확장',noteSub:'앞으로 볼 것: Model Y L 실 판매·3-row SUV 시장 침투·미국 배송 페이스',footer:'TSLA Model Y L · 325 miles · 3-row',brand:BK},
 en:{title:'TSLA — Edmunds Reviews New Model Y L · Suspension · 325 Miles · FSD Included · 3-Row SUV Alternative',heroIcon:'🚙',heroBig:'325 mi',heroSub:'The Tesla Newsview: Edmunds review of new Model Y L · adaptive suspension smoother ride · quieter cabin · premium interior · 3rd-row head room · 325 miles EPA range · FSD Supervised included · alternative to larger 3-row SUVs frame',
  cards:[{icon:'🚙',big:'325 miles',mid:'EPA range',sub:'Model Y L'},{icon:'🛋️',big:'3rd row',mid:'Head room improved',sub:'Larger SUV alternative'},{icon:'⚡',big:'0-40 4.4s',mid:'Acceleration',sub:'FSD included'}],
  quoteLabel:'EDMUNDS · THE TESLA NEWSVIEW',quoteKo:'"Model Y L은 3-row SUV 대안·Tesla driving dynamics 유지"',quoteEn:'"Model Y L is a compelling alternative to larger three-row SUVs while retaining Tesla driving dynamics"',
  source:'Source: The Tesla Newsview·Edmunds·2026.08.05',
  noteHead:'Why: TSLA product diversification · combined with 8/5 China 93K and today Samsung/LG Cybercab deal expands sales axis',noteSub:'Watch: Model Y L actual sales · 3-row SUV market penetration · US delivery pace',footer:'TSLA Model Y L · 325 miles · 3-row',brand:BE}},

// 13. Samsung/LG Cybercab camera deal
{file:'tsla-samsung-lg-cybercab-camera-500m',symbol:'TSLA',
 ko:{title:'TSLA — 삼성전기·LG이노텍 Cybercab 카메라 모듈 계약 확정·20-30K 대·총 $500M·삼성 7월 생산 시작',heroIcon:'📷',heroBig:'$500 M',heroSub:'BREAKING: 삼성전기·LG이노텍이 Tesla Cybercab 카메라 모듈 계약 확보·삼성 7월 대량 생산 시작·LG 올해 시작·초기 20K-30K Cybercab 대상·총 계약 규모 $500M 추정',
  cards:[{icon:'🇰🇷',big:'삼성·LG',mid:'카메라 모듈',sub:'Cybercab 공급'},{icon:'🚗',big:'20-30 K',mid:'초기 Cybercab',sub:'대상 대수'},{icon:'💰',big:'$500 M',mid:'총 계약 규모',sub:'추정치'}],
  quoteLabel:'BREAKING',quoteKo:'"삼성전기·LG이노텍이 Tesla Cybercab 카메라 계약 확보·삼성 7월 생산 시작·LG 올해 시작·20-30K 대·$500M"',quoteEn:'"Samsung Electro-Mechanics and LG Innotek secured Tesla Cybercab camera module orders · Samsung July mass production · LG this year · 20K-30K Cybercabs · $500M"',
  source:'출처: BREAKING·2026.08.05',
  noteHead:'왜 중요한가: 8/5 Robotaxi Ops 6개 시도 채용·오늘 Model Y L 리뷰와 결합·Cybercab 실 상용 배치 준비 완료',noteSub:'앞으로 볼 것: Cybercab 실 대량 배치·삼성·LG 매출 반영·다른 부품 공급망 확정',footer:'TSLA Cybercab · 삼성·LG · $500M',brand:BK},
 en:{title:'TSLA — Samsung Electro-Mechanics/LG Innotek Secure Cybercab Camera Module Deal · 20K-30K Units · $500M Total · Samsung July Production',heroIcon:'📷',heroBig:'$500 M',heroSub:'BREAKING: Samsung Electro-Mechanics and LG Innotek secured Tesla Cybercab camera module orders · Samsung began mass production in July · LG expected to begin this year · initial 20K-30K Cybercabs · total estimated at $500M',
  cards:[{icon:'🇰🇷',big:'Samsung·LG',mid:'Camera module',sub:'Cybercab supplier'},{icon:'🚗',big:'20-30 K',mid:'Initial Cybercabs',sub:'Unit count'},{icon:'💰',big:'$500 M',mid:'Total deal size',sub:'Estimated'}],
  quoteLabel:'BREAKING',quoteKo:'"삼성·LG Cybercab 카메라·$500M"',quoteEn:'"Samsung Electro-Mechanics and LG Innotek secured Tesla Cybercab camera module orders · Samsung July mass production · LG this year · 20K-30K Cybercabs · $500M"',
  source:'Source: BREAKING·2026.08.05',
  noteHead:'Why: Combined with 8/5 Robotaxi Ops 6-city hiring and today Model Y L review · Cybercab real commercial deployment prep complete',noteSub:'Watch: Cybercab actual mass deployment · Samsung/LG revenue reflection · other parts supply chain confirmation',footer:'TSLA Cybercab · Samsung·LG · $500M',brand:BE}},

// 14. Musk CEO control for decade decisions
{file:'musk-ceo-control-decade-mars-moon',symbol:'SPCX',
 ko:{title:'Musk — "CEO control 필요·10년 후 pay-off 결정 보호·화성/달 문명 프레임"',heroIcon:'🎯',heroBig:'DECADE',heroSub:'Ark Invest Tracker: Musk가 한 사람이 회사를 많이 control하는 게 합리적인지 물음에 답변·"public 회사는 매 분기 실적 압박으로 5-10년 후 pay-off 아이디어 투자 discourage"·SPCX 목표는 지구 밖 의식 확장·달·화성 문명·초기 대량 지출 필요',
  cards:[{icon:'🎯',big:'10년',mid:'pay-off 결정',sub:'CEO control 보호'},{icon:'🌌',big:'화성·달',mid:'문명 확장',sub:'지구 밖 의식'},{icon:'💸',big:'초기 지출',mid:'대량 필요',sub:'수익 후행'}],
  quoteLabel:'ELON MUSK · ARK INVEST TRACKER',quoteKo:'"public 회사는 분기 실적 압박·5-10년 후 pay-off 아이디어 discourage·SPCX는 지구 밖 의식 확장 목표"',quoteEn:'"Public companies face quarterly pressure, discouraging 5-10 year payoff ideas · SPCX goal is extending consciousness beyond Earth"',
  source:'출처: Ark Invest Tracker·Elon Musk·2026.08.05',
  noteHead:'왜 중요한가: SPCX CEO control 정당화·8/5 Musk +TSLA 매출·오늘 -10% 시세와 락업 만료 상황에서 장기 비전 프레임',noteSub:'앞으로 볼 것: SPCX governance 구조·CEO 결정권 유지·장기 프로젝트 진행',footer:'Musk · CEO control · 10년 pay-off',brand:BK},
 en:{title:'Musk — "CEO Control Needed to Protect Decade Pay-Off Decisions · Mars/Moon Civilization Frame"',heroIcon:'🎯',heroBig:'DECADE',heroSub:'Ark Invest Tracker: Musk answers whether it\'s sensible for one person to have this much control · "Public companies face quarterly pressure, discouraging investing in ideas that may only pay off within 5-10 years" · SPCX goal is extending consciousness beyond Earth · Moon/Mars civilization · initial heavy spending needed',
  cards:[{icon:'🎯',big:'10 years',mid:'Pay-off decisions',sub:'CEO control protects'},{icon:'🌌',big:'Mars·Moon',mid:'Civilization expansion',sub:'Beyond Earth consciousness'},{icon:'💸',big:'Initial spending',mid:'Heavy needed',sub:'Revenue lags'}],
  quoteLabel:'ELON MUSK · ARK INVEST TRACKER',quoteKo:'"public 분기 압박·5-10년 아이디어 discourage·SPCX 지구 밖 의식 확장"',quoteEn:'"Public companies face quarterly pressure, discouraging 5-10 year payoff ideas · SPCX goal is extending consciousness beyond Earth"',
  source:'Source: Ark Invest Tracker · Elon Musk · 2026.08.05',
  noteHead:'Why: Justifies SPCX CEO control · 8/5 Musk +TSLA revenue · long-term vision frame amid today\'s -10% price and lockup expiration',noteSub:'Watch: SPCX governance structure · CEO decision authority maintenance · long-term project progress',footer:'Musk · CEO Control · Decade Pay-Off',brand:BE}},

// 15. Michael Burry 1987 warning + MMF $2.3T
{file:'burry-1987-warning-mmf-23t-ath',symbol:'MACRO',
 ko:{title:'매크로 — Michael Burry "1987-type 붕괴·major top 근접" 경고 + 머니마켓 펀드 $2.3T ATH',heroIcon:'⚠️',heroBig:'1987',heroSub:'Barchart: Michael Burry(2008 예측)가 "주식 시장이 major top 근접·1987-type 붕괴 가능"·별개로 머니마켓 펀드 $2.3T 사상 최고 유입·현금 대기·리스크 회피 심리 강화',
  cards:[{icon:'⚠️',big:'1987 fall',mid:'Burry 경고',sub:'major top 근접'},{icon:'💰',big:'$2.3 T',mid:'머니마켓 펀드',sub:'사상 최고'},{icon:'🛡️',big:'현금 대기',mid:'리스크 회피',sub:'심리 강화'}],
  quoteLabel:'MICHAEL BURRY · BARCHART',quoteKo:'"주식 시장이 major top 근접·1987-type 붕괴 가능·머니마켓 $2.3T ATH"',quoteEn:'"Stock market approaching major top · possible 1987-type fall · money market funds $2.3T ATH"',
  source:'출처: Barchart·Michael Burry·2026.08.05',
  noteHead:'왜 중요한가: 8/5 Citadel "7월 재정" vs 오늘 Burry "1987 붕괴" 대립·매크로 완화 vs 부담 다층 갈등 지속',noteSub:'앞으로 볼 것: MMF 유입 지속·VIX 반응·SPY ATH 돌파 vs 조정',footer:'MACRO Burry 1987 · MMF $2.3T',brand:BK},
 en:{title:'MACRO — Michael Burry "1987-Type Fall · Major Top Approaching" Warning + Money Market Funds $2.3T ATH',heroIcon:'⚠️',heroBig:'1987',heroSub:'Barchart: Michael Burry (2008 forecaster) warns "stock market approaching major top · possible 1987-type fall" · separately money market funds $2.3T all-time high inflows · cash on sidelines · risk aversion strengthening',
  cards:[{icon:'⚠️',big:'1987 fall',mid:'Burry warning',sub:'Major top near'},{icon:'💰',big:'$2.3 T',mid:'Money market funds',sub:'All-time high'},{icon:'🛡️',big:'Cash sidelines',mid:'Risk aversion',sub:'Sentiment strengthens'}],
  quoteLabel:'MICHAEL BURRY · BARCHART',quoteKo:'"major top·1987-type 붕괴·MMF $2.3T ATH"',quoteEn:'"Stock market approaching major top · possible 1987-type fall · money market funds $2.3T ATH"',
  source:'Source: Barchart·Michael Burry·2026.08.05',
  noteHead:'Why: Conflict between 8/5 Citadel "July reset" and today Burry "1987 fall" · macro relief vs burden multi-layer conflict continues',noteSub:'Watch: MMF inflows continuity · VIX reaction · SPY ATH breakout vs correction',footer:'MACRO Burry 1987 · MMF $2.3T',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260806.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260806-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
