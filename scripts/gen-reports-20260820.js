// 2026-08-20 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.20';

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
// 1. Musk quality > quantity team
{file:'musk-quality-over-quantity-team-motivated',symbol:'TSLA',
 ko:{title:'Musk "질이 양보다 우선·항상 그렇다"·동기 있는 소수의 뛰어난 사람들이 대규모 평범한 인원보다 낫다',heroIcon:'💎',heroBig:'질 > 양',heroSub:'일론 머스크가 자신의 팀 구성 원칙을 다시 밝혔다. 극도로 동기 있는 소수의 뛰어난 사람들이 평범하고 소극적으로 동기 있는 대규모 인원보다 훨씬 더 좋은 성과를 낸다는 프레임이다.',
  cards:[{icon:'💎',big:'질이 우선',mid:'뛰어난 소수 팀',sub:'항상 그렇다는 프레임'},{icon:'⚡',big:'극도 동기',mid:'실행력 배가',sub:'평범 대규모 대비 앞선다'},{icon:'👥',big:'소수 정예',mid:'조직 구성 원칙',sub:'Musk 자기 미션'}],
  quote:'"작지만 예외적인 사람들로 구성된 팀이 대규모 평범한 팀보다 훨씬 낫다. 극도로 동기 있는 사람들이 소극적으로 동기 있는 사람들보다 훨씬 더 좋은 성과를 낸다. 질이 양보다 우선이다. 항상 그렇다."',
  noteHead:'왜 중요한가',noteSub:'Tesla·SpaceX·xAI 인재 채용·조직 문화의 명확한 프레임이다. 8/13 SpaceX All-Hands의 개인 약속과 정합하며 인재 유치·유출 경쟁의 배경이 된다.',footer:'Musk · 팀 원칙',brand:BK},
 en:{title:'Musk "Quality Over Quantity, Always" · Small Team of Exceptional People Beats Large Group of Average',heroIcon:'💎',heroBig:'QUALITY > QUANTITY',heroSub:'Elon Musk restated his team-building principle. A small team of exceptional, extremely motivated people delivers far better than a large group of average, passively motivated ones.',
  cards:[{icon:'💎',big:'Quality first',mid:'Exceptional small team',sub:'Always the case frame'},{icon:'⚡',big:'Extreme motivation',mid:'Execution multiplied',sub:'Beats large average'},{icon:'👥',big:'Small elite',mid:'Organization principle',sub:'Musk personal mission'}],
  quote:'"A small team of exceptional people who are highly motivated can do better than a large number of people who are pretty good and moderately motivated. Extremely motivated people deliver far better than passively motivated ones. Quality over quantity. Always."',
  noteHead:'Why this matters',noteSub:'Clear framing of Tesla/SpaceX/xAI hiring and org culture. Aligns with 8/13 SpaceX All-Hands personal promise · backdrop of talent attraction/exit competition.',footer:'Musk · Team Principle',brand:BE}},

// 2. US Treasury debt buyback panic
{file:'us-treasury-debt-buyback-liquidity-panic-4-5b',samlabel:'MACRO',symbol:'MACRO',
 ko:{title:'미국 재무부 국채 환매 대폭 확대·10-20년물 및 20-30년물 유동성 공급·operation당 최소 40억 달러·최대 50억 달러',heroIcon:'🏛️',heroBig:'40-50억',heroSub:'미국 재무부가 유동성 지원을 위한 국채 환매 규모를 크게 늘리고 있다. 특히 장기 채권 (10-20년·20-30년 섹터) 매입 규모가 이전 대비 최소 두 배로 확대되며, 각 operation당 최대치가 이제 20억 달러에서 40억 달러 이상으로 상향되고, 일부 operation은 최대 50억 달러까지 잡힌다.',
  cards:[{icon:'🏛️',big:'재무부 확대',mid:'국채 환매 규모',sub:'유동성 공급 목적'},{icon:'📊',big:'10-30년물',mid:'장기 채권 매입',sub:'섹터별 두 배 이상'},{icon:'💵',big:'50억 상한',mid:'operation당 최대',sub:'20억 → 40-50억'}],
  quote:'"미국 재무부가 유동성 공급을 위한 국채 환매 규모를 최소 두 배로 확대했다. 10-20년·20-30년 장기 채권 섹터의 매입이 대상이며, 각 operation당 최대 금액이 20억 달러에서 40억 달러 이상으로 올라갔다. 일부 operation은 최대 50억 달러까지 잡힌다."',
  noteHead:'왜 중요한가',noteSub:'장기 채권 유동성 부족의 실 신호다. 재무부가 시장 안정을 위해 환매 규모를 극단으로 확대하고 있으며, 이는 금리 방향과 매크로 리스크를 결정하는 축이다.',footer:'매크로 · 재무부 환매 확대',brand:BK},
 en:{title:'US Treasury Sharply Expands Debt Buybacks · 10-20 & 20-30 Year Sectors · Up to $4-5B Per Operation',heroIcon:'🏛️',heroBig:'$4-5 B',heroSub:'US Treasury is sharply expanding debt buyback operations for longer-dated nominal coupon securities. Purchase sizes in the 10-20 year sector and 20-30 year sector at least double vs prior · maximum per operation raised from $2B to at least $4B · some operations up to $5B.',
  cards:[{icon:'🏛️',big:'Treasury expands',mid:'Debt buyback scale',sub:'Liquidity support'},{icon:'📊',big:'10-30 year',mid:'Long bond purchases',sub:'At least double per sector'},{icon:'💵',big:'$5B cap',mid:'Max per operation',sub:'$2B → $4-5B'}],
  quote:'"US Treasury sharply expanded debt buybacks for longer-dated nominal coupon securities · purchases in 10-20 and 20-30 year sectors at least doubled · maximum per operation rose from $2B to at least $4B · some operations up to $5B."',
  noteHead:'Why this matters',noteSub:'Real signal of long-bond liquidity stress. Treasury expanding buybacks extremely for market stability · this is an axis defining rate direction and macro risk.',footer:'MACRO · Treasury Buyback Expansion',brand:BE}},

// 3. MacHarder Memphis GPU cluster
{file:'macharder-memphis-100k-gpu-cluster-5pct-cheaper',symbol:'SPCX',
 ko:{title:'Musk가 Memphis에 100,000 GPU 규모 클러스터 완공 발표·전력 비용 5% 저렴한 부지·MacHarder 명명',heroIcon:'💻',heroBig:'100K GPU',heroSub:'Musk의 xAI가 Memphis 남부에 위치한 100,000 GPU 규모의 초대형 컴퓨트 클러스터를 세운다. 사이트는 최근까지 파이프라인 사이의 유일한 부지였고, Mississippi 전력이 미국 평균 대비 5% 저렴해서 이곳을 선택했다. 이 클러스터가 완공되면 규모로는 세계 최대 중 하나가 되며, 이번 몇 주 안에 서비스 개시가 예정이다.',
  cards:[{icon:'💻',big:'100,000 GPU',mid:'Memphis 사이트',sub:'MacHarder 명명'},{icon:'⚡',big:'5% 저렴',mid:'Mississippi 전력 비용',sub:'미국 평균 대비'},{icon:'📅',big:'수 주 안',mid:'서비스 개시 예정',sub:'세계 최대급 규모'}],
  quote:'"Musk가 Memphis 남부에 100,000 GPU 규모의 대형 컴퓨트를 완공한다. Mississippi 전력이 미국 평균 대비 5% 저렴해서 이곳을 선택했고, 이는 파이프라인 사이의 유일한 부지였다. 완공되면 규모로는 세계 최대 중 하나이며, 이번 몇 주 안에 서비스 개시가 예정이다."',
  noteHead:'왜 중요한가',noteSub:'xAI Colossus GPU 클러스터가 두 번째 대형 사이트로 확장된다. 8/13 All-Hands의 15 GW·2027 목표 프레임의 실 구축이다.',footer:'SPCX·xAI · MacHarder 100K GPU',brand:BK},
 en:{title:'Musk Completing 100,000 GPU Cluster in Memphis · Mississippi Power 5% Cheaper · Named MacHarder',heroIcon:'💻',heroBig:'100K GPU',heroSub:'Musk xAI is building a 100,000 GPU compute cluster south of Memphis. Site was one of the only ones between pipelines · Mississippi power is 5% cheaper than the US average, driving the selection. Once completed this will be one of the largest in the world by scale, with service expected to start within weeks.',
  cards:[{icon:'💻',big:'100,000 GPU',mid:'Memphis site',sub:'Named MacHarder'},{icon:'⚡',big:'5% cheaper',mid:'Mississippi power cost',sub:'vs US average'},{icon:'📅',big:'Within weeks',mid:'Service start expected',sub:'Among largest in world'}],
  quote:'"Musk is building 100,000 GPU cluster south of Memphis · Mississippi power is 5% cheaper than the US average, driving the site selection · this was one of the only sites between pipelines · once completed, among the largest in the world by scale · service expected to start within weeks."',
  noteHead:'Why this matters',noteSub:'xAI Colossus GPU cluster expands to a second major site. Real build-out of the 8/13 All-Hands 15 GW / 2027 target frame.',footer:'SPCX·xAI · MacHarder 100K GPU',brand:BE}},

// 4. Nvidia Jensen Huang: Musk uses AI best
{file:'nvidia-jensen-huang-musk-uses-ai-best',symbol:'NVDA',
 ko:{title:'NVIDIA CEO Jensen Huang "Musk보다 AI를 더 잘 활용하는 사람은 없다"',heroIcon:'🏆',heroBig:'AI 활용 1위',heroSub:'NVIDIA CEO Jensen Huang이 Musk의 AI 활용 능력을 명시적으로 최상위로 표현했다. NVIDIA는 xAI·Tesla FSD·SpaceX 컴퓨트 등 Musk 회사 그룹의 최대 GPU 공급자이다.',
  cards:[{icon:'🏆',big:'AI 활용 1위',mid:'Jensen Huang 언급',sub:'Musk가 최상'},{icon:'🤝',big:'NVIDIA 파트너',mid:'xAI·Tesla·SpaceX',sub:'최대 GPU 공급'},{icon:'💬',big:'CEO 발언',mid:'공개 컨퍼런스',sub:'명시적 최상위 표현'}],
  quote:'"NVIDIA CEO 젠슨 황이 Musk보다 AI를 더 잘 활용하는 사람은 없다고 명시적으로 밝혔다."',
  noteHead:'왜 중요한가',noteSub:'세계 최대 GPU 회사 CEO가 Musk의 AI 활용 능력을 최상위로 인정한 프레임이다. 8/12 NVDA + SPCX 2,600억 GPU 딜의 배경 신뢰 요인이다.',footer:'NVDA · Jensen Huang Musk',brand:BK},
 en:{title:'NVIDIA CEO Jensen Huang "Nobody Uses AI Better Than Musk"',heroIcon:'🏆',heroBig:'#1 AI USER',heroSub:'NVIDIA CEO Jensen Huang explicitly ranked Musk at the very top for AI utilization. NVIDIA is the largest GPU supplier to Musk company group including xAI, Tesla FSD, and SpaceX compute.',
  cards:[{icon:'🏆',big:'#1 AI user',mid:'Jensen Huang statement',sub:'Musk at the top'},{icon:'🤝',big:'NVIDIA partner',mid:'xAI/Tesla/SpaceX',sub:'Largest GPU supply'},{icon:'💬',big:'CEO statement',mid:'Public conference',sub:'Explicit top ranking'}],
  quote:'"NVIDIA CEO Jensen Huang explicitly said nobody uses AI better than Musk."',
  noteHead:'Why this matters',noteSub:'CEO of world largest GPU company acknowledges Musk at top for AI utilization. Backdrop trust factor for the 8/12 NVDA + SPCX $260B GPU deal.',footer:'NVDA · Jensen Huang Musk',brand:BE}},

// 5. Cybertruck factory 100 bodyshells + Cybercab/Y ramp
{file:'cybertruck-factory-100-bodyshells-cybercab-y-2027',symbol:'TSLA',
 ko:{title:'Cybertruck 팩토리 100대 보디쉘 준비·Cybercab과 Model Y 2027년부터 램프 예정',heroIcon:'🏭',heroBig:'100 보디쉘',heroSub:'Giga Texas의 Cybertruck 팩토리에 이미 100대 분량의 보디쉘이 준비되어 있고, 라인은 8월 하순 대량 unveil 이벤트를 위해 준비 중이다. 이 팩토리에서 Cybercab과 Model Y가 2027년부터 대량 생산으로 램프될 예정이다. Big Cybercab launch가 곧 다가온다.',
  cards:[{icon:'🏭',big:'100대',mid:'Cybertruck 보디쉘 준비',sub:'Giga Texas 팩토리'},{icon:'📅',big:'8월 하순',mid:'대량 unveil 이벤트',sub:'준비 완료 단계'},{icon:'🚀',big:'2027 램프',mid:'Cybercab · Model Y',sub:'대량 생산 예정'}],
  quote:'"Giga Texas의 Cybertruck 팩토리에 100대 분량의 보디쉘이 이미 준비되어 있고, 8월 하순 대형 이벤트를 위한 라인 준비가 완료 단계다. 이 팩토리에서 Cybercab과 Model Y가 2027년부터 대량 생산으로 램프될 예정이다."',
  noteHead:'왜 중요한가',noteSub:'8/19 Cybercab launch 이번 달 안 Austin 프레임의 실 생산 기반이다. Cybertruck·Cybercab·Model Y가 같은 팩토리에서 대량 생산되는 구조다.',footer:'TSLA · Cybertruck 100 · Cybercab 2027',brand:BK},
 en:{title:'Cybertruck Factory Has 100 Bodyshells Ready · Cybercab and Model Y to Ramp From 2027',heroIcon:'🏭',heroBig:'100 SHELLS',heroSub:'Cybertruck factory at Giga Texas already has 100 bodyshells prepared, with lines being readied for a big late-August unveil event. Cybercab and Model Y are set to ramp in mass production at this factory starting in 2027. Big Cybercab launch is imminent.',
  cards:[{icon:'🏭',big:'100 units',mid:'Cybertruck bodyshells',sub:'Giga Texas factory'},{icon:'📅',big:'Late August',mid:'Mass unveil event',sub:'Preparation complete stage'},{icon:'🚀',big:'2027 ramp',mid:'Cybercab · Model Y',sub:'Mass production planned'}],
  quote:'"Cybertruck factory at Giga Texas already has 100 bodyshells ready and lines are near final prep for a large late-August event. Cybercab and Model Y will ramp in mass production at this factory starting in 2027."',
  noteHead:'Why this matters',noteSub:'Real production base for the 8/19 "Cybercab public launch in Austin this month" frame. Cybertruck/Cybercab/Model Y all mass-produced at same factory.',footer:'TSLA · Cybertruck 100 · Cybercab 2027',brand:BE}},

// 6. Treasury boosts buybacks after yields hit multi-decade highs
{file:'treasury-boosts-buybacks-yields-multidecade-highs',symbol:'MACRO',
 ko:{title:'미국 재무부 다중 십년 최고 국채 수익률 이후 국채 환매 대폭 확대·재무부 규제·유동성 우려',heroIcon:'📉',heroBig:'환매 급증',heroSub:'국채 수익률이 다중 십년 최고 수준까지 오른 이후 미국 재무부가 국채 환매 규모를 대폭 확대하고 있다. 장기 채권 유동성이 저하되고 매도자를 찾기 어려워진 상황에서 재무부가 매수측으로 나서서 시장 안정을 유지하려는 조치다.',
  cards:[{icon:'📉',big:'다중 십년 최고',mid:'국채 수익률',sub:'환매 확대의 배경'},{icon:'💧',big:'유동성 저하',mid:'장기 채권 매매',sub:'매도자 부족'},{icon:'🏛️',big:'재무부 매수측',mid:'시장 안정 목적',sub:'환매 대폭 확대'}],
  quote:'"미국 재무부가 국채 수익률이 다중 십년 최고에 도달한 이후 국채 환매를 대폭 확대하고 있다. 재무부는 특히 오래된 국채·덜 매매되는 국채를 대상으로 환매 사업을 급증시키고 있으며, 이는 국채 시장 유동성을 개선하고 장기 채권 이자 부담을 줄이려는 목적이다."',
  noteHead:'왜 중요한가',noteSub:'국채 유동성 저하는 매크로 리스크의 핵심 신호다. 8/19 나스닥 futures short 사상 최대와 함께 매크로 경계 프레임 다층이다.',footer:'매크로 · 환매·수익률 최고',brand:BK},
 en:{title:'US Treasury Boosts Debt Buybacks After Yields Hit Multi-Decade Highs · Regulatory & Liquidity Concerns',heroIcon:'📉',heroBig:'BUYBACK SURGE',heroSub:'US Treasury is sharply expanding debt buybacks after yields hit multi-decade highs. Long-bond liquidity deteriorated and finding sellers became harder · Treasury stepping in as buyer to maintain market stability.',
  cards:[{icon:'📉',big:'Multi-decade high',mid:'Treasury yields',sub:'Backdrop for expansion'},{icon:'💧',big:'Liquidity down',mid:'Long-bond trading',sub:'Seller shortage'},{icon:'🏛️',big:'Treasury as buyer',mid:'Market stability goal',sub:'Sharp buyback expansion'}],
  quote:'"US Treasury is boosting debt buyback operations after yields hit multi-decade highs · Treasury is ramping buybacks of older, less-traded securities · aim is improving Treasury market liquidity and reducing long-bond interest burden."',
  noteHead:'Why this matters',noteSub:'Long-bond liquidity deterioration is a core macro risk signal. Multi-layer macro caution frame with 8/19 record Nasdaq futures short.',footer:'MACRO · Buyback · Yields High',brand:BE}},

// 7. Polymarket 21% American workers used AI
{file:'polymarket-21pct-american-workers-used-ai-work',symbol:'MACRO',
 ko:{title:'미국 노동자 21%가 상반기 업무에서 AI 사용·2020 챗봇 launch 이후 최고·프로그래머·상위 소득자 우세',heroIcon:'💼',heroBig:'21%',heroSub:'미국 노동자 중 21%가 2026년 상반기 업무에서 AI 도구를 성공적으로 사용했다는 관측이다. 이는 2020년 대화형 chatbot의 상용 launch 이후 가장 높은 채택률이다. 프로그래머·컴퓨팅 모듈·핵심 기술 그룹이 상위이며, 대체로 상위 소득자·high-agency 전문가들이 사용 경험을 이끈다.',
  cards:[{icon:'💼',big:'21%',mid:'미국 노동자 AI 사용',sub:'상반기 업무 기준'},{icon:'📅',big:'최고 채택률',mid:'2020 챗봇 launch 이후',sub:'가장 높음'},{icon:'👨‍💻',big:'프로그래머 우세',mid:'컴퓨팅·상위 소득자',sub:'채택 리드 그룹'}],
  quote:'"미국 노동자 21%가 상반기 업무에서 AI 도구를 성공적으로 사용했다. 이는 2020년 대화형 챗봇 상용 launch 이후 가장 높은 채택률이며, 프로그래머·컴퓨팅 모듈·핵심 기술 그룹이 채택을 리드하고 있고 대체로 상위 소득자·high-agency 전문가들이 사용 경험을 이끈다."',
  noteHead:'왜 중요한가',noteSub:'AI 채택이 프로그래머·상위 소득자 중심에서 넓은 노동 시장으로 확산되는 초기 지표다. AI 사업 매출 성장의 실 사용자 기반이다.',footer:'매크로 · 미국 21% AI 사용',brand:BK},
 en:{title:'21% of American Workers Successfully Used AI at Work in H1 · Highest Since 2020 Chatbot Launch · Programmers & High Earners Lead',heroIcon:'💼',heroBig:'21%',heroSub:'21% of American workers successfully used AI tools at work in H1 2026. This is the highest adoption since the 2020 commercial launch of conversational chatbots. Programmers, computing modules, and core technology groups lead, with mostly higher-income, high-agency professionals driving usage.',
  cards:[{icon:'💼',big:'21%',mid:'US worker AI usage',sub:'H1 work basis'},{icon:'📅',big:'Highest adoption',mid:'Since 2020 chatbot launch',sub:'Peak'},{icon:'👨‍💻',big:'Programmers lead',mid:'Computing / high earners',sub:'Adoption lead group'}],
  quote:'"21% of American workers successfully used AI tools at work in H1 · highest adoption rate since the 2020 commercial launch of conversational chatbots · programmers, computing modules, and core technology groups lead · mostly higher-income, high-agency professionals drive usage."',
  noteHead:'Why this matters',noteSub:'Early indicator of AI adoption spreading from programmers/high-earners to broader labor market. Real user base for AI business revenue growth.',footer:'MACRO · US 21% AI at work',brand:BE}},

// 8. BLS 1M jobs benchmark revisions
{file:'bls-1m-jobs-benchmark-revisions-lost-12-months',symbol:'MACRO',
 ko:{title:'미국 노동통계국 이전 벤치마크 revision에서 100만 개 일자리 감산·지난 12개월 손실',heroIcon:'📊',heroBig:'-100만',heroSub:'미국 노동통계국(BLS)이 이전 벤치마크 revision에서 100만 개 이상의 일자리를 감산했다. 지난 12개월 동안 잃은 것으로 처리된다. 재무부는 이 데이터를 근거로 20-30년 섹터에서 최소 20억 달러 규모의 국채 환매 operation을 준비 중이다.',
  cards:[{icon:'📊',big:'-100만',mid:'BLS 이전 벤치마크 revision',sub:'12개월 손실'},{icon:'📅',big:'12개월',mid:'손실 처리 기간',sub:'이전 데이터 조정'},{icon:'🏛️',big:'재무부 대응',mid:'20-30년 채권 환매',sub:'최소 20억 달러'}],
  quote:'"미국 노동통계국이 이전 벤치마크 revision에서 100만 개 이상의 일자리를 감산했다. 지난 12개월 동안 잃은 것으로 처리되며, 이 데이터를 근거로 재무부가 20-30년 섹터에서 최소 20억 달러 규모의 국채 환매 operation을 준비 중이다."',
  noteHead:'왜 중요한가',noteSub:'과거 노동 데이터가 대폭 하향 조정되면서 실 노동 시장 상태가 예상보다 약한 상황이다. 매크로 정책 방향 결정 축이다.',footer:'매크로 · BLS -100만 revision',brand:BK},
 en:{title:'US BLS Cuts 1 Million Jobs in Prior Benchmark Revisions · Lost Over 12 Months',heroIcon:'📊',heroBig:'-1M JOBS',heroSub:'US Bureau of Labor Statistics cut more than 1 million jobs in prior benchmark revisions. Treated as lost over the past 12 months. Treasury is preparing at least $2B buyback operations in the 20-30 year sector based on this data.',
  cards:[{icon:'📊',big:'-1M',mid:'BLS prior benchmark revisions',sub:'12-month loss'},{icon:'📅',big:'12 months',mid:'Loss treatment period',sub:'Prior data adjustment'},{icon:'🏛️',big:'Treasury response',mid:'20-30 year buyback',sub:'At least $2B'}],
  quote:'"US BLS cut more than 1 million jobs in prior benchmark revisions · treated as lost over past 12 months · Treasury preparing at least $2B buyback operations in the 20-30 year sector based on this data."',
  noteHead:'Why this matters',noteSub:'Prior labor data revised sharply lower · actual labor market weaker than expected. Axis for macro policy direction.',footer:'MACRO · BLS -1M revision',brand:BE}},

// 9. Tesla Cybertruck 8/23 launch + Robotaxi FSD unsupervised ready
{file:'tesla-cybertruck-823-launch-robotaxi-fsd-unsupervised',symbol:'TSLA',
 ko:{title:'Tesla Cybercab 공개 launch 8월 23일·Robotaxi 함대 FSD unsupervised 준비 완료·5+ 새 도시 8/23 전·5+ 새 도시 9/25 전',heroIcon:'🚕',heroBig:'8/23',heroSub:'Tesla Cybercab의 공개 launch 이벤트가 8월 23일에 확정됐고, 이 이벤트가 FSD unsupervised가 준비 완료됐음을 신호한다. 5개 이상의 새 도시에 8월 23일 이전 배치 예정이고, 추가로 5개 이상 도시에 9월 25일 이전 배치 예정이다.',
  cards:[{icon:'🚕',big:'8/23',mid:'Cybercab 공개 launch',sub:'날짜 확정 · 8/25 발표'},{icon:'🤖',big:'FSD unsupervised',mid:'준비 완료 신호',sub:'Robotaxi 확장'},{icon:'📅',big:'10+ 도시',mid:'8/23·9/25 전 배치',sub:'실 상용 확장'}],
  quote:'"Cybercab 공개 launch 이벤트가 8월 23일 확정이며 Robotaxi 앱에서는 8/23 밤 11:59pm까지 라이드 완료 시 참여 가능하다. 당첨자는 8/25 발표. Robotaxi 함대 확장은 FSD unsupervised가 준비 완료됐음을 신호하며, 5개 이상 새 도시에 8/23 이전·5+ 도시에 9/25 이전 추가 배치 예정이다."',
  noteHead:'왜 중요한가',noteSub:'Cybercab 공개 launch가 8/23 확정되면서 8/19 이번 달 안 Austin·8/17 Robotaxi 200일 무사고와 결합해 실 상용 배치가 급속 확장된다. 실 매출 반영 시점이다.',footer:'TSLA · Cybercab 8/23 · Robotaxi 확장',brand:BK},
 en:{title:'Tesla Cybertruck Launches August 23 · Robotaxi FSD Unsupervised Ready · 5+ New Cities Before 8/23 · 5+ More Before 9/25',heroIcon:'🚕',heroBig:'AUG 23',heroSub:'Tesla Cybercab public launch event is confirmed for August 23. Robotaxi app requires rides completed by 11:59pm on 8/23; winners announced 8/25. Robotaxi fleet expansion signals FSD unsupervised is ready. 5+ new cities deployed before Aug 23 · 5+ more before Sep 25.',
  cards:[{icon:'🚕',big:'Aug 23',mid:'Cybercab public launch',sub:'Confirmed · 8/25 announce'},{icon:'🤖',big:'FSD unsupervised',mid:'Ready signal',sub:'Robotaxi expansion'},{icon:'📅',big:'10+ cities',mid:'Before 8/23 & 9/25',sub:'Real commercial expansion'}],
  quote:'"Cybercab public launch confirmed for August 23. Robotaxi app rides must be completed by 11:59pm on 8/23; winners announced 8/25. Robotaxi fleet expansion signals FSD unsupervised is ready. 5+ new cities before Aug 23 and 5+ more before September 25."',
  noteHead:'Why this matters',noteSub:'Cybercab public launch confirmed for 8/23 combined with 8/19 Austin frame and 8/17 Robotaxi 200-day incident-free · real commercial deployment expands rapidly. Real revenue reflection timing.',footer:'TSLA · Cybercab 8/23 · Robotaxi expansion',brand:BE}},

// 10. Musk Cybercab profit exceeds Uber+Lyft combined
{file:'musk-cybercab-profit-exceeds-uber-lyft-combined',symbol:'TSLA',
 ko:{title:'Musk "Cybercab 이익이 Uber+Lyft 합친 것을 초과할 것"·SpaceX·Tesla·xAI 통합 시나리오',heroIcon:'💵',heroBig:'Uber+Lyft 초과',heroSub:'Musk는 Tesla Cybercab이 만들 이익 규모가 Uber와 Lyft가 합쳐서 만든 이익을 넘어설 것이라고 밝혔다. Robotaxi가 몇 년 안에 실적 컨트리뷰터로 자리 잡으면서 Tesla의 12x forward 실적 배수가 재평가된다는 프레임이다.',
  cards:[{icon:'💵',big:'Uber+Lyft 초과',mid:'Cybercab 이익 규모',sub:'Musk 프레임'},{icon:'🚕',big:'Robotaxi 실적',mid:'몇 년 안 컨트리뷰터',sub:'실적 반영 시점'},{icon:'📊',big:'12x 재평가',mid:'Tesla forward 배수',sub:'Robotaxi 실체화 시'}],
  quote:'"Tesla Cybercab이 만들 이익이 Uber와 Lyft가 합쳐서 만든 이익을 초과할 것이다. Robotaxi가 몇 년 안에 실적 컨트리뷰터로 자리 잡을 것이며, 이는 Tesla의 12x forward 배수를 재평가하는 요인이다."',
  noteHead:'왜 중요한가',noteSub:'8/19 Cybercab launch·Cybertruck 100 보디쉘 준비와 결합해서 Robotaxi 사업의 매출 규모 프레임이 극단으로 확장된다.',footer:'TSLA · Cybercab > Uber+Lyft',brand:BK},
 en:{title:'Musk "Cybercab Profit Will Exceed Uber + Lyft Combined" · SpaceX/Tesla/xAI Integration Scenario',heroIcon:'💵',heroBig:'BEYOND UBER+LYFT',heroSub:'Musk stated Tesla Cybercab profit will exceed the profit of Uber and Lyft combined. Robotaxi becoming a real earnings contributor within a few years reframes Tesla 12x forward multiple.',
  cards:[{icon:'💵',big:'> Uber+Lyft',mid:'Cybercab profit scale',sub:'Musk frame'},{icon:'🚕',big:'Robotaxi earnings',mid:'Few years contributor',sub:'Real timing'},{icon:'📊',big:'12x re-rating',mid:'Tesla forward multiple',sub:'When Robotaxi materializes'}],
  quote:'"Tesla Cybercab profit will exceed the profit of Uber and Lyft combined. Robotaxi will become a real earnings contributor within a few years · a factor that reframes Tesla 12x forward multiple."',
  noteHead:'Why this matters',noteSub:'Combined with 8/19 Cybercab launch and Cybertruck 100 bodyshells ready · Robotaxi business revenue scale frame expands extremely.',footer:'TSLA · Cybercab > Uber+Lyft',brand:BE}},

// 11. Starlink 11,003 satellites in orbit
{file:'starlink-11003-satellites-orbit-2018-2026-growth',symbol:'SPCX',
 ko:{title:'Starlink 궤도 위성 11,003대 돌파·2018년 46대에서 2026년 11,003대까지 급성장',heroIcon:'🛰️',heroBig:'11,003',heroSub:'Starlink가 궤도 위성 총 11,003대를 넘어섰다. 2018년 46대로 시작한 발사가 2019년 165대, 이후 매년 대폭 증가해 2026년 11,003대에 이르렀다. Starship이 규모의 안정한 배포에 참여하기 시작하면 이 규모는 극단으로 확대된다.',
  cards:[{icon:'🛰️',big:'11,003대',mid:'Starlink 궤도 위성 총',sub:'2026년 8월 기준'},{icon:'📅',big:'2018 → 2026',mid:'46 → 11,003',sub:'매년 급성장'},{icon:'🚀',big:'Starship 참여',mid:'규모 안정 배포',sub:'극단 확장 잠재'}],
  quote:'"Starlink가 궤도 위성 11,003대를 넘어섰다. 2018년 46대로 시작한 발사가 2019년 165대, 이후 매년 대폭 증가해 2026년 11,003대에 이르렀다. Starship이 규모의 안정한 배포에 참여하기 시작하면 이 규모는 극단으로 확대된다."',
  noteHead:'왜 중요한가',noteSub:'8/19 UBS Starlink 성장 프레임의 실 인프라 기반이다. Starship 배포 확대 시 위성 규모의 극단 확대 잠재다.',footer:'SPCX · Starlink 11,003 위성',brand:BK},
 en:{title:'Starlink Surpassed 11,003 Satellites in Orbit · From 46 in 2018 to 11,003 in 2026',heroIcon:'🛰️',heroBig:'11,003',heroSub:'Starlink has surpassed 11,003 satellites in orbit. Launches started from 46 in 2018, rising to 165 in 2019 and increasing sharply each year to reach 11,003 in 2026. Once Starship joins stable deployment at scale, this number expands extremely.',
  cards:[{icon:'🛰️',big:'11,003',mid:'Starlink orbit total',sub:'As of Aug 2026'},{icon:'📅',big:'2018 → 2026',mid:'46 → 11,003',sub:'Sharp yearly growth'},{icon:'🚀',big:'Starship joins',mid:'Stable scale deploy',sub:'Extreme upside potential'}],
  quote:'"Starlink has surpassed 11,003 satellites in orbit · from 46 in 2018 to 165 in 2019, growing sharply each year to reach 11,003 in 2026 · once Starship enters stable deployment at scale, this number expands extremely."',
  noteHead:'Why this matters',noteSub:'Real infrastructure base for 8/19 UBS Starlink growth frame. Extreme upside when Starship deployment expands.',footer:'SPCX · Starlink 11,003 sats',brand:BE}},

// 12. Starship 100M tonnes/year vs 2025 2,213 tonnes total
{file:'starship-100m-tonnes-year-orbital-vs-2213-2025',symbol:'SPCX',
 ko:{title:'Starship "일 년에 궤도로 최대 100만 톤"·2025년 전 세계 궤도 발사 총 2,213톤 대비 극단 확장 프레임',heroIcon:'🚀',heroBig:'100만 톤',heroSub:'Falcon이 이미 발사 능력을 세 배로 확장했고, SpaceX가 세계 무게 대부분을 담당한다는 상황에서 Starship이 이 능력을 완전히 새로운 수준으로 가져갈 준비 중이다. 완전 재사용 시 일 년에 궤도로 최대 100만 톤까지 발사 가능하다는 프레임이며, 이는 2025년 세계 궤도 발사 총 2,213톤 대비 극단 확장이다.',
  cards:[{icon:'🚀',big:'100만 톤',mid:'Starship 연간 궤도 능력',sub:'완전 재사용 시'},{icon:'📊',big:'2,213톤',mid:'2025년 세계 궤도 총',sub:'비교 기준'},{icon:'♾️',big:'극단 확장',mid:'100M vs 2,213',sub:'약 450배 확장'}],
  quote:'"Falcon이 이미 발사 능력을 세 배로 확장했고 SpaceX가 세계 발사 무게 대부분을 담당한다. Starship이 완전 재사용될 경우 일 년에 궤도로 최대 100만 톤까지 발사할 수 있으며, 이는 2025년 전 세계 궤도 발사 총 2,213톤 대비 극단 확장이다."',
  noteHead:'왜 중요한가',noteSub:'우주 인프라 규모의 근본 확장 프레임이다. 우주 데이터센터·궤도 인프라·연구 실험 규모가 극단으로 커진다.',footer:'SPCX · Starship 100M ton/y',brand:BK},
 en:{title:'Starship "Up to 100 Million Tonnes per Year to Orbit" · vs 2,213 Tonnes Total in 2025 · Extreme Expansion Frame',heroIcon:'🚀',heroBig:'100M TONNES',heroSub:'Falcon has already tripled launch capacity and SpaceX handles most of the world launch weight. Starship is poised to take this capability to a completely new level · with full reusability, up to 100 million tonnes per year can be launched to orbit · versus 2,213 tonnes total for all global orbital launches in 2025.',
  cards:[{icon:'🚀',big:'100M tonnes',mid:'Starship annual orbit',sub:'Full reusability'},{icon:'📊',big:'2,213 tonnes',mid:'2025 global orbit total',sub:'Comparison basis'},{icon:'♾️',big:'Extreme scale',mid:'100M vs 2,213',sub:'~450x expansion'}],
  quote:'"Falcon has already tripled launch capacity and SpaceX handles most of the world launch weight · once Starship is fully reusable, up to 100 million tonnes per year can go to orbit · vs 2,213 tonnes total for all global orbital launches in 2025."',
  noteHead:'Why this matters',noteSub:'Fundamental expansion frame for space infrastructure scale. Space datacenters, orbital infrastructure, research experiments scale extremely.',footer:'SPCX · Starship 100M ton/y',brand:BE}},

// 13. Moderna 190% best day in history (cancer vaccine)
{file:'moderna-190pct-best-day-history-cancer-vaccine',symbol:'MACRO',
 ko:{title:'Moderna 하루 +146% 급등·역사상 최고 상승일·암 백신 재발 방지 성공',heroIcon:'💊',heroBig:'+146%',heroSub:'Moderna가 하루 +146% 급등하며 역사상 최고 상승일을 기록했다. 암 백신이 재발 방지에 성공한 것이 주요 원인이다.',
  cards:[{icon:'💊',big:'+146%',mid:'Moderna 하루 상승',sub:'역사상 최고 상승일'},{icon:'🧪',big:'암 백신',mid:'재발 방지 성공',sub:'주요 원인'},{icon:'📅',big:'역사 기록',mid:'단일 종목 하루 상승',sub:'제약 섹터 이례적'}],
  quote:'"Moderna가 하루 +146% 급등하며 역사상 최고 상승일을 기록했다. 이 회사의 암 백신이 재발 방지에 성공한 것이 주요 원인이다."',
  noteHead:'왜 중요한가',noteSub:'제약 섹터 이례적 이벤트이며, 실 임상 성공이 시세 극단 상승으로 실체화되는 사례다.',footer:'MRNA · +146% 하루',brand:BK},
 en:{title:'Moderna +146% Best Day in History · Cancer Vaccine Success in Preventing Recurrence',heroIcon:'💊',heroBig:'+146%',heroSub:'Moderna soared +146% in a single day, best day in history. The company cancer vaccine succeeded in preventing recurrence, driving the move.',
  cards:[{icon:'💊',big:'+146%',mid:'Moderna daily rise',sub:'Best day in history'},{icon:'🧪',big:'Cancer vaccine',mid:'Recurrence prevention success',sub:'Main driver'},{icon:'📅',big:'Historic record',mid:'Single stock daily rise',sub:'Unusual pharma sector event'}],
  quote:'"Moderna soared +146% in a single day, best day in history · driven by the company cancer vaccine succeeding in preventing recurrence."',
  noteHead:'Why this matters',noteSub:'Unusual pharma sector event · case of real clinical success materializing as extreme price rise.',footer:'MRNA · +146% Day',brand:BE}},

// 14. Kalshi 60% Tesla+SpaceX merge in next 10 years
{file:'kalshi-60pct-tesla-spacex-merge-10-years',symbol:'TSLA',
 ko:{title:'예측 시장 "Tesla와 SpaceX 다음 10년 안 병합 확률 60%"·약 100억 달러 시가총액 병합 잠재',heroIcon:'🔗',heroBig:'60%',heroSub:'예측 시장이 Tesla와 SpaceX가 다음 10년 안에 병합할 확률을 60%로 매기고 있다. 100억 달러+ 시가총액 병합 시나리오이며, Musk 회사 그룹 통합 프레임의 극단 시나리오다.',
  cards:[{icon:'🔗',big:'60%',mid:'병합 확률',sub:'다음 10년'},{icon:'💰',big:'100억+',mid:'시가총액 병합 잠재',sub:'대형 통합'},{icon:'⚡',big:'통합 시나리오',mid:'Musk 회사 그룹',sub:'극단 프레임'}],
  quote:'"예측 시장이 Tesla와 SpaceX가 다음 10년 안에 병합할 확률을 60%로 매기고 있다. 이는 100억 달러+ 시가총액 병합 시나리오이며, Musk 회사 그룹 통합의 극단 프레임이다."',
  noteHead:'왜 중요한가',noteSub:'8/19 SPCX 60억 filing·Musk 개인 48.7% 지분 프레임과 결합해 통합 논의가 예측 시장에서 60% 확률로 매겨진다는 실 관측이다.',footer:'TSLA + SPCX · 병합 60%',brand:BK},
 en:{title:'Prediction Market "60% Chance Tesla + SpaceX Merge in Next 10 Years" · ~$10B Market Cap Merge Potential',heroIcon:'🔗',heroBig:'60%',heroSub:'Prediction market pricing Tesla and SpaceX to merge in the next 10 years at 60% probability. $10B+ market cap merge scenario · extreme scenario in the Musk company group integration frame.',
  cards:[{icon:'🔗',big:'60%',mid:'Merge probability',sub:'Next 10 years'},{icon:'💰',big:'$10B+',mid:'Market cap merge potential',sub:'Large integration'},{icon:'⚡',big:'Integration scenario',mid:'Musk company group',sub:'Extreme frame'}],
  quote:'"Prediction market prices 60% chance Tesla and SpaceX merge in the next 10 years · $10B+ market cap merge scenario · extreme scenario in the Musk company group integration frame."',
  noteHead:'Why this matters',noteSub:'Combined with 8/19 SPCX $6B filing and Musk personal 48.7% stake · merger discussion priced at 60% probability in prediction market is real observation.',footer:'TSLA + SPCX · Merge 60%',brand:BE}},

// 15. Whole Mars Catalog Cybercab architecture
{file:'wholemars-cybercab-agentic-coding-cybersab-architecture',symbol:'TSLA',
 ko:{title:'Whole Mars Catalog "Cybercab Agentic Coding 아키텍처·자체 LLM 학습·4-5배 저렴한 LLM·48V 시스템·센서 클러스터"',heroIcon:'⚙️',heroBig:'4-5x 저렴',heroSub:'Cybercab의 아키텍처가 Agentic Coding 방식으로 설계됐다는 관측이다. Tesla가 자체 LLM을 학습시켜 하드웨어와 소프트웨어를 동시에 최적화하며, LLM 학습 비용이 4-5배 저렴해진다. 48V 시스템이 효율적인 body 컴퓨터 제어를 가능하게 하고, 센서 클러스터·브레이크 페달 배치 등이 특징이다.',
  cards:[{icon:'⚙️',big:'4-5배 저렴',mid:'자체 LLM 학습 비용',sub:'하드·소프트 최적화'},{icon:'⚡',big:'48V 시스템',mid:'효율적 body 컴퓨터 제어',sub:'전력·배선 절감'},{icon:'📸',big:'센서 클러스터',mid:'Cybercab 아키텍처',sub:'브레이크 페달 등 배치'}],
  quote:'"Cybercab 아키텍처가 Agentic Coding 방식으로 설계됐고, 자체 LLM 학습으로 하드웨어와 소프트웨어를 동시에 최적화한다. LLM 학습 비용이 4-5배 저렴해지며, 48V 시스템이 효율적 body 컴퓨터 제어를 가능하게 한다. 센서 클러스터·브레이크 페달 배치 등이 아키텍처 특징이다."',
  noteHead:'왜 중요한가',noteSub:'8/20 Cybertruck 100 보디쉘·Cybercab 2027 램프 프레임의 기술 세부 확인이다. 자체 LLM 학습이 4-5배 원가 절감을 만든다는 프레임이 실 수익성 향상으로 연결된다.',footer:'TSLA · Cybercab 4-5x LLM',brand:BK},
 en:{title:'Cybercab Agentic Coding Architecture · In-House LLM Training · 4-5x Cheaper LLMs · 48V System · Sensor Cluster',heroIcon:'⚙️',heroBig:'4-5x CHEAPER',heroSub:'Cybercab architecture is designed with Agentic Coding methodology. Tesla trains its own LLMs to jointly optimize hardware and software · LLM training cost becomes 4-5x cheaper. 48V system enables efficient body computer control · sensor cluster and brake pedal placement are architectural features.',
  cards:[{icon:'⚙️',big:'4-5x cheaper',mid:'In-house LLM training',sub:'HW/SW joint optimization'},{icon:'⚡',big:'48V system',mid:'Efficient body computer',sub:'Power/wiring savings'},{icon:'📸',big:'Sensor cluster',mid:'Cybercab architecture',sub:'Brake pedal etc'}],
  quote:'"Cybercab architecture is designed with Agentic Coding methodology · in-house LLM training jointly optimizes HW and SW · LLM training cost 4-5x cheaper · 48V system enables efficient body computer control · sensor cluster and brake pedal placement are architectural features."',
  noteHead:'Why this matters',noteSub:'Technical detail confirmation of the 8/20 Cybertruck 100 bodyshells / Cybercab 2027 ramp frame. In-house LLM training driving 4-5x cost savings connects to real profitability improvement.',footer:'TSLA · Cybercab 4-5x LLM',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260820.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260820-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
