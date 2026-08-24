// 2026-08-24 리포트 SVG 생성기 · 14 topics + summary · 폰트 고정 · 폭 초과 시만 wrap
//
// ⚠️ 다음날(08-25~) gen부터 추가: 제목·heroSub도 단어 나열 금지, 문장으로. 스킬 「문장으로 쓰기」.
//   quote: 2~4줄 (무슨 일 + 어디/누구 + 숫자 + 용어 한 줄 풀이). 한 줄 헤드라인만 금지.
//   noteHead/noteSub: 「왜 중요한가」+ 초보용 2~3문장 (왜 뉴스 → 뭐가 다른지 → 다음에 볼 것).
//   글이 늘면 quote/note 박스 높이·multilineIfOverflow maxLines를 먼저 늘릴 것.
//   상세: .cursor/skills/investus-report-update/SKILL.md 「SVG 카피 밀도」
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.24';
const DATETAG = '20260824';

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
  QUOTE_KO: 19, QUOTE_EN: 16,
  NOTE_HEAD: 18, NOTE_SUB: 16,
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
  <rect x="60" y="630" width="960" height="200" rx="16" fill="#0f172a" stroke="#374151"/>
${multilineIfOverflow(oRaw.quote, 540, 688, F.QUOTE_KO, MAX_W.WIDE, 5, 26, `font-family="Arial" font-size="${F.QUOTE_KO}" fill="${p.fg}" text-anchor="middle"`)}
  <text x="540" y="818" font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle">${o.dateLabel||DATE}</text>
  <rect x="60" y="838" width="960" height="140" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
${multilineIfOverflow(oRaw.noteHead, 540, 868, F.NOTE_HEAD, MAX_W.WIDE, 2, 24, `font-family="Arial" font-size="${F.NOTE_HEAD}" fill="${p.fg}" text-anchor="middle"`)}
${multilineIfOverflow(oRaw.noteSub, 540, 910, F.NOTE_SUB, MAX_W.WIDE, 3, 22, `font-family="Arial" font-size="${F.NOTE_SUB}" fill="#9ca3af" text-anchor="middle"`)}
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
    ? 'Cybercab 09.03 Austin · 4680 캐소드 북미 · 시내 로밍'
    : 'Cybercab 09.03 Austin · 4680 NA cathode · city roaming';
  const heroSub2 = ko
    ? 'DB ARR $98.1B · Starlink 11,040 · NVDA $6B Poolside · 30Y 5.27%'
    : 'DB ARR $98.1B · Starlink 11,040 · NVDA $6B Poolside · 30Y 5.27%';
  const c = [
    {icon:'🚕', big: ko?'09.03.26':'09.03.26', mid: ko?'Cybercab 이벤트':'Cybercab event', sub: ko?'Austin, TX 전용 초대':'Austin TX exclusive', stroke:'#4ade80', card:'#0a1a0a'},
    {icon:'🔋', big: ko?'4680':'4680', mid: ko?'북미 첫 대형 캐소드':'First large NA cathode', sub: ko?'Austin · 건식 코팅':'Austin · dry coating', stroke:'#4ade80', card:'#0a1a0a'},
    {icon:'📡', big: '$98.1B', mid: ko?'DB 연말 ARR 전망':'DB year-end ARR', sub: ko?'Neocloud $48B':'Neocloud $48B', stroke:'#c084fc', card:'#1a0f2a'},
    {icon:'🛰️', big: '11,040', mid: ko?'Starlink 가동 위성':'Starlink working sats', sub: ko?'다음 9개 LEO 합 >5배':'Next 9 LEO >5x', stroke:'#c084fc', card:'#1a0f2a'},
    {icon:'🧠', big: '$6B', mid: ko?'Nvidia×Poolside':'Nvidia×Poolside', sub: ko?'Nemotron·오픈웨이트':'Nemotron open-weight', stroke:'#60a5fa', card:'#0a1220'},
    {icon:'📉', big: '5.27%', mid: ko?'30Y 주간 종가':'30Y weekly close', sub: ko?'2007년 6월 이후 최고':'Highest since Jun 2007', stroke:'#94a3b8', card:'#111827'},
  ];
  const extra1 = ko
    ? 'Citizens ~87% IRR · WSJ FSD Model Y · Austin 심야 로밍 · natgas 트레이딩 데스크'
    : 'Citizens ~87% IRR · WSJ FSD Model Y · Austin night roaming · natgas trading desk';
  const extra2 = ko
    ? 'NVDA 15%+ 가격인상 · Trump SPCX $15k–$50k · Ship 41 · 수 PCE+GDP · 금 Warsh'
    : 'NVDA 15%+ AI price hike · Trump SPCX $15k–$50k · Ship 41 · Wed PCE+GDP · Fri Warsh';
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
{file:'tsla-cybercab-event-090326-austin',symbol:'TSLA',
 ko:{title:'Tesla Cybercab 전용 이벤트 09.03.26 Austin TX · Exclusive Access',heroIcon:'🚕',heroBig:'09.03.26',heroSub:'Tesla 그래픽 Exclusive Access Cybercab · 09.03.26 · Austin, TX. 날짜 표기는 월.일.년 = 2026년 9월 3일. Evan: 이벤트가 약 2주 앞으로 다가왔다. Cybercab = 운전석 없는 전용 로보택시 차량.',
  cards:[{icon:'📅',big:'9/3',mid:'2026년 9월 3일',sub:'월.일.년 표기'},{icon:'📍',big:'Austin',mid:'텍사스 현지 초대',sub:'Exclusive Access'},{icon:'🚕',big:'~2주',mid:'Evan 카운트다운',sub:'전용차 공개 축'}],
  quote:'"Tesla가 Cybercab 전용 초대를 걸었다. 날짜 09.03.26은 2026년 9월 3일, 장소는 Austin TX다. Cybercab은 Model Y 개조가 아니라 운전석 없는 전용 로보택시 차량이다. Evan은 이벤트가 약 2주 앞이라고 적었다."',
  noteHead:'왜 중요한가',noteSub:'공개 라이드 임박 발언 다음에 날짜가 박힌 초대장이 나왔다. 소프트웨어 데모가 아니라 전용 폼팩터 이벤트라 유닛 원가·양산 일정이 같이 검증된다. 다음엔 초청 범위·시승 유무·양산 언급을 본다.',footer:'TSLA · Cybercab Event · 09.03.26 Austin',brand:BK},
 en:{title:'Tesla Cybercab Exclusive Event 09.03.26 Austin TX',heroIcon:'🚕',heroBig:'09.03.26',heroSub:'Tesla graphic: Exclusive Access Cybercab · 09.03.26 · Austin, TX. Date format month.day.year = September 3, 2026. Evan: event is about two weeks away. Cybercab = dedicated robotaxi with no driver seat.',
  cards:[{icon:'📅',big:'9/3',mid:'September 3, 2026',sub:'Month.day.year'},{icon:'📍',big:'Austin',mid:'On-site invite',sub:'Exclusive Access'},{icon:'🚕',big:'~2 wks',mid:'Evan countdown',sub:'Dedicated vehicle'}],
  quote:'"Tesla posted Exclusive Access for Cybercab. 09.03.26 is September 3, 2026 in Austin, TX. Cybercab is a dedicated robotaxi, not a Model Y conversion. Evan said the event is about two weeks out."',
  noteHead:'Why this matters',noteSub:'After “imminent rides” talk, a dated invite landed. This is a dedicated-form-factor event, so unit cost and production timing get tested together. Next: invite list, rides, production comments.',footer:'TSLA · Cybercab Event · 09.03.26 Austin',brand:BE}},

{file:'tsla-4680-cathode-austin-na',symbol:'TSLA',
 ko:{title:'Tesla 북미 첫 대형 4680 캐소드 공장 Austin · 건식 코팅',heroIcon:'🔋',heroBig:'4680',heroSub:'Tesla North America: Austin에 4680용 북미 첫 대형 캐소드 플랜트. Aakash Gupta: 중국이 캐소드 공급 ~90%. 베이징 수출통제 2025. Tesla는 용매 슬러리가 아닌 건식 코팅. 풀 건식 전극 2026년 1월. Maxwell 기술 ~7년. Project Cathode 허가 2022.',
  cards:[{icon:'🏭',big:'Austin',mid:'북미 첫 대형 캐소드',sub:'4680 전용'},{icon:'🇨🇳',big:'~90%',mid:'중국 캐소드 공급',sub:'수출통제 2025'},{icon:'🧪',big:'건식',mid:'dry coating',sub:'풀 전극 Jan 2026'}],
  quote:'"Tesla가 Austin에 4680용 북미 첫 대형 캐소드 공장을 연다고 했다. 캐소드는 배터리 양극재로, 세계 공급의 약 90%가 중국이다. 2025 수출통제 이후 현지화가 급해졌다. Tesla는 용매 슬러리 대신 건식 코팅을 쓰고, 풀 건식 전극은 2026년 1월 프레임이다."',
  noteHead:'왜 중요한가',noteSub:'로보택시·에너지 스케일의 병목이 셀 화학이 아니라 양극재 공급망일 수 있다. 건식 공정은 공장 면적·용제 비용을 줄이는 쪽이다. 허가(2022 Project Cathode)에서 실제 가동·수율까지가 다음 확인점이다.',footer:'TSLA · 4680 Cathode Austin',brand:BK},
 en:{title:'Tesla First Large-Scale NA 4680 Cathode Plant in Austin · Dry Coating',heroIcon:'🔋',heroBig:'4680',heroSub:'Tesla NA: first large-scale North American cathode plant for 4680 in Austin. Aakash Gupta: China ~90% of cathode supply; Beijing export controls 2025. Tesla dry coating not solvent slurry; full dry electrodes Jan 2026; Maxwell ~7 years; Project Cathode permit 2022.',
  cards:[{icon:'🏭',big:'Austin',mid:'First large NA cathode',sub:'For 4680'},{icon:'🇨🇳',big:'~90%',mid:'China cathode supply',sub:'Export controls 2025'},{icon:'🧪',big:'Dry',mid:'Dry coating',sub:'Full electrodes Jan 2026'}],
  quote:'"Tesla says Austin will host the first large-scale North American cathode plant for 4680. Cathode is the battery positive electrode; China supplies about 90%. After 2025 export controls, localization is urgent. Tesla uses dry coating, not solvent slurry; full dry electrodes dated January 2026."',
  noteHead:'Why this matters',noteSub:'Robotaxi and energy scale can bottleneck on cathode supply, not just cell chemistry. Dry process cuts plant footprint and solvent cost. Next check is actual output and yield after the 2022 Project Cathode permit.',footer:'TSLA · 4680 Cathode Austin',brand:BE}},

{file:'tsla-cybercab-austin-roaming',symbol:'TSLA',
 ko:{title:'Austin 시내 심야 Cybercab 로밍 · 감독관만·운전자 개입 없음',heroIcon:'🚕',heroBig:'로밍',heroSub:'Robotaxi Radar: 토요일 밤 Austin에 양산급 Cybercab이 돌아다님. 감독관은 있으나 운전자가 조작하지 않음. Doctor Jack: 새벽 3시에 다수가 데이터 수집. 위젯 TSLA $362.86 +5.14%.',
  cards:[{icon:'🌃',big:'토요 밤',mid:'Austin 시내',sub:'양산급 Cybercab'},{icon:'👤',big:'감독만',mid:'운전자 조작 없음',sub:'safety supervisor'},{icon:'📊',big:'3am',mid:'다수 대수 목격',sub:'데이터 수집'}],
  quote:'"Robotaxi Radar는 토요일 밤 Austin에서 양산급 Cybercab이 시내를 돈다고 했다. 차 안에는 감독관이 있지만 핸들을 잡는 운전자는 없다. Doctor Jack은 새벽 3시에 여러 대가 데이터를 모은다고 적었다. 같은 포스트 위젯은 TSLA $362.86(+5.14%)."',
  noteHead:'왜 중요한가',noteSub:'초대장·허가 뉴스와 달리 도로 위 실차가 찍힌 층이다. 감독관만 태운 로밍은 유료 승객 서비스 직전 단계로 읽힌다. 다음엔 유료 여부·운행 시간대·사고·개입 횟수를 본다.',footer:'TSLA · Austin Cybercab Roaming',brand:BK},
 en:{title:'Production-Grade Cybercabs Roaming Austin at Night · Supervisors, No Active Drivers',heroIcon:'🚕',heroBig:'Roaming',heroSub:'Robotaxi Radar: production-grade Cybercabs in Austin Saturday night; supervisors aboard but no active drivers. Doctor Jack: many Cybercabs at 3am collecting data. Widget TSLA $362.86 +5.14%.',
  cards:[{icon:'🌃',big:'Sat night',mid:'Austin streets',sub:'Production-grade'},{icon:'👤',big:'Supervisor',mid:'No active driver',sub:'Safety rider'},{icon:'📊',big:'3am',mid:'Multiple units seen',sub:'Data collection'}],
  quote:'"Robotaxi Radar said production-grade Cybercabs were roaming Austin Saturday night. Supervisors ride along but no driver is operating. Doctor Jack saw many units at 3am collecting data. The same post widget showed TSLA $362.86 (+5.14%)."',
  noteHead:'Why this matters',noteSub:'Unlike invites and permits, this is cars on public roads. Supervisor-only roaming is the step before paid passenger service. Next: paid rides, hours, incidents, interventions.',footer:'TSLA · Austin Cybercab Roaming',brand:BE}},

{file:'tsla-citizens-87irr-100k',symbol:'TSLA',
 ko:{title:'Citizens Bank 로보택시 IRR ~87% · 차량 ~$100K여도',heroIcon:'📈',heroBig:'~87%',heroSub:'Shay Boloor / Citizens: 대당 약 $100K여도 내부수익률(IRR) ~87%. 기사 제거가 요금의 절반 이상을 깎는다. 표: 하루 18.50트립 · $15/트립 · 365일 · 연 매출 ~$101,288. 비용 Y1–Y3 −$50k→−$60k. 금융 12%. 차량 다운 −$10k + 연 −$30k. 현금흐름 Y0 −$10k, Y1 $11,688, Y2 $9,088, Y3 $7,688.',
  cards:[{icon:'💹',big:'~87%',mid:'IRR (내부수익률)',sub:'~$100K/대 가정'},{icon:'💵',big:'$101k',mid:'연 매출 가정',sub:'18.50×$15×365'},{icon:'🧑‍✈️',big:'기사 제거',mid:'요금 >절반 하락',sub:'유닛 이코노믹스'}],
  quote:'"Citizens Bank 표는 로보택시 한 대의 IRR이 약 87%라고 한다. IRR은 투자금 대비 연환산 수익률이다. 가정은 대당 약 10만 달러, 하루 18.50트립, 트립당 15달러, 연 매출 약 10.1만 달러다. 기사를 빼면 요금이 절반 넘게 내려간다는 설명이 붙었다."',
  noteHead:'왜 중요한가',noteSub:'월가 은행이 전용차 원가가 높아도 현금흐름이 나온다는 표를 돌렸다. 가정이 깨지면(가동률·요금·금융 12%) 숫자는 급히 내려간다. 다음엔 Austin 실 트립·요금이 표와 맞는지 본다.',footer:'TSLA · Citizens ~87% IRR',brand:BK},
 en:{title:'Citizens Bank Robotaxi IRR ~87% Even at ~$100K per Vehicle',heroIcon:'📈',heroBig:'~87%',heroSub:'Shay Boloor / Citizens: ~87% IRR even at ~$100K/vehicle. Removing the driver cuts ride cost by more than half. Table: 18.50 trips/day, $15/trip, 365 days, revenue ~$101,288/yr; costs −$50k to −$60k Y1–Y3; financing 12%; vehicle −$10k down + −$30k/yr Y1–3; cash flows Y0 −$10k, Y1 $11,688, Y2 $9,088, Y3 $7,688.',
  cards:[{icon:'💹',big:'~87%',mid:'IRR',sub:'~$100K/vehicle'},{icon:'💵',big:'$101k',mid:'Annual revenue',sub:'18.50×$15×365'},{icon:'🧑‍✈️',big:'No driver',mid:'Fare >half down',sub:'Unit economics'}],
  quote:'"Citizens Bank’s table puts robotaxi IRR near 87%. IRR is annualized return on invested cash. Assumptions: about $100K per vehicle, 18.50 trips/day at $15, ~$101k yearly revenue. The note says removing the driver cuts the ride cost by more than half."',
  noteHead:'Why this matters',noteSub:'A bank is circulating cash-flow math that still works if dedicated cars are expensive. If utilization, fares, or 12% financing slip, the IRR collapses. Next: real Austin trips and prices vs the table.',footer:'TSLA · Citizens ~87% IRR',brand:BE}},

{file:'tsla-wsj-fsd-model-y',symbol:'TSLA',
 ko:{title:'WSJ Dan Neil: FSD가 신형 Model Y에서 가장 좋은 점',heroIcon:'🚗',heroBig:'FSD',heroSub:'Sawyer Merritt / Dan Neil WSJ 2026.08.22: Full Self-Driving Is the Best Thing about the New Tesla Model Y. FSD Supervised를 출퇴근 혼잡·추종·차선 중앙 유지에서 높게 평가.',
  cards:[{icon:'📰',big:'WSJ',mid:'Dan Neil 8/22',sub:'Model Y 리뷰'},{icon:'🧠',big:'FSD',mid:'Supervised',sub:'혼잡·추종·차선'},{icon:'🥇',big:'Best',mid:'신형 Y의 핵심',sub:'하드웨어 아닌 SW'}],
  quote:'"WSJ의 Dan Neil은 2026년 8월 22일 칼럼에서 신형 Model Y에서 가장 좋은 점이 Full Self-Driving이라고 썼다. FSD Supervised는 사람이 감독하는 자율주행이다. 출퇴근 혼잡, 앞차 따라가기, 차선 중앙 유지를 칭찬했다. Sawyer Merritt가 스크린을 공유했다."',
  noteHead:'왜 중요한가',noteSub:'주류 자동차 칼럼이 FSD를 옵션이 아니라 차의 핵심 상품으로 적었다. JPM V15 step-change와 같은 주 소프트웨어 축이다. 다만 Supervised는 무인 상용과 다르니 규제·사고율은 따로 본다.',footer:'TSLA · WSJ FSD Model Y',brand:BK},
 en:{title:'WSJ Dan Neil: FSD Is the Best Thing about the New Model Y',heroIcon:'🚗',heroBig:'FSD',heroSub:'Sawyer Merritt / Dan Neil WSJ Aug 22, 2026: “Full Self-Driving Is the Best Thing about the New Tesla Model Y.” Praises FSD Supervised in rush hour, following, lane centering.',
  cards:[{icon:'📰',big:'WSJ',mid:'Dan Neil Aug 22',sub:'Model Y review'},{icon:'🧠',big:'FSD',mid:'Supervised',sub:'Rush hour · follow'},{icon:'🥇',big:'Best',mid:'Core of new Y',sub:'Software not sheetmetal'}],
  quote:'"Dan Neil in the WSJ on Aug 22, 2026 wrote that Full Self-Driving is the best thing about the new Model Y. FSD Supervised means a human still oversees. He praised rush-hour traffic, car-following, and lane centering. Sawyer Merritt shared the screen."',
  noteHead:'Why this matters',noteSub:'A mainstream auto column treats FSD as the product, not an add-on. It sits on the same software week as JPM’s V15 step-change. Supervised is not unmanned commercial service — track incidents separately.',footer:'TSLA · WSJ FSD Model Y',brand:BE}},

{file:'us-30y-527-weekly-close-2007',symbol:'MACRO',
 ko:{title:'미국 30Y 주간 종가 5.27% · 2007년 6월 이후 최고',heroIcon:'📉',heroBig:'5.27%',heroSub:'Barchart: 주간 종가 5.27%, 2007년 6월 이후 가장 높은 주간 종가. 차트 USTY30.RT 금요일 2026.08.21, +0.04.',
  cards:[{icon:'📈',big:'5.27%',mid:'30Y 주간 종가',sub:'Fri Aug 21'},{icon:'📅',big:'2007.6',mid:'이후 최고 주간 종가',sub:'약 19년'},{icon:'📊',big:'+0.04',mid:'USTY30.RT',sub:'Barchart'}],
  quote:'"Barchart는 미국 30년 국채 수익률 주간 종가가 5.27%라고 했다. 2007년 6월 이후 가장 높은 주간 종가다. 차트 심볼은 USTY30.RT, 금요일 2026년 8월 21일, 일간 +0.04. 장기 금리가 오르면 주식·부동산 할인율이 같이 올라간다."',
  noteHead:'왜 중요한가',noteSub:'8/22에 환매 급락이 지워진 뒤, 주간 종가 기준으로 19년 고점이 확인됐다. AI CAPEX·모기지·성장주 멀티플에 같은 방향 압력이다. 다음 주 수요일 PCE·GDP가 이 레벨을 확인할지 본다.',footer:'MACRO · 30Y 5.27% weekly close',brand:BK},
 en:{title:'US 30Y Weekly Close 5.27% · Highest Weekly Close Since June 2007',heroIcon:'📉',heroBig:'5.27%',heroSub:'Barchart: week close 5.27%, highest weekly close since June 2007. Chart USTY30.RT Friday Aug 21, 2026, +0.04.',
  cards:[{icon:'📈',big:'5.27%',mid:'30Y weekly close',sub:'Fri Aug 21'},{icon:'📅',big:'Jun 2007',mid:'Highest weekly since',sub:'~19 years'},{icon:'📊',big:'+0.04',mid:'USTY30.RT',sub:'Barchart'}],
  quote:'"Barchart put the US 30-year yield weekly close at 5.27% — the highest weekly close since June 2007. Symbol USTY30.RT, Friday Aug 21, 2026, +0.04 on the day. Higher long rates lift discount rates on stocks and housing together."',
  noteHead:'Why this matters',noteSub:'After the buyback dip vanished on 8/22, the weekly close confirms a 19-year high. Same-direction pressure on AI CAPEX, mortgages, and growth multiples. Next week’s Wednesday PCE and GDP will test the level.',footer:'MACRO · 30Y 5.27% Weekly Close',brand:BE}},

{file:'macro-week-pce-gdp-warsh-jackson-hole',symbol:'MACRO',
 ko:{title:'다음 주 수 PCE+GDP · 금 Kevin Warsh Jackson Hole',heroIcon:'📅',heroBig:'PCE',heroSub:'Bull Theory: 대규모 환매 이후 금리가 한차례 빠졌고, 다음 주 수요일 PCE와 GDP, 금요일 Kevin Warsh가 Jackson Hole에 선다.',
  cards:[{icon:'📉',big:'환매 후',mid:'금리 일시 하락',sub:'Buybacks'},{icon:'📊',big:'수',mid:'PCE + GDP',sub:'인플레·성장'},{icon:'🎤',big:'금',mid:'Kevin Warsh',sub:'Jackson Hole'}],
  quote:'"Bull Theory는 환매 규모가 커진 뒤 금리가 잠시 떨어졌다고 적었다. 다음 주 카렌더는 수요일 PCE(개인소비지출 물가)와 GDP, 금요일 Kevin Warsh의 Jackson Hole 발언이다. PCE는 연준이 보는 물가 지표고, Warsh는 차기 정책 인사로 거론되는 이름이다."',
  noteHead:'왜 중요한가',noteSub:'30Y 주간 고점과 같은 주에 데이터·인사가 몰린다. PCE가 높으면 5.27%가 고착될 수 있고, Warsh 톤은 장기물 수급 기대를 흔든다. 환매로 나온 금리 하락은 이미 한 번 지워진 전례가 있다.',footer:'MACRO · PCE GDP · Warsh JH',brand:BK},
 en:{title:'Next Week Wed PCE+GDP · Fri Kevin Warsh at Jackson Hole',heroIcon:'📅',heroBig:'PCE',heroSub:'Bull Theory: yields dropped after larger buybacks; next week Wednesday PCE and GDP, Friday Kevin Warsh at Jackson Hole.',
  cards:[{icon:'📉',big:'Post-buyback',mid:'Yields dipped',sub:'Then recovered'},{icon:'📊',big:'Wed',mid:'PCE + GDP',sub:'Inflation · growth'},{icon:'🎤',big:'Fri',mid:'Kevin Warsh',sub:'Jackson Hole'}],
  quote:'"Bull Theory said yields fell after larger buybacks. Next week: Wednesday PCE and GDP, Friday Kevin Warsh at Jackson Hole. PCE is the Fed’s preferred inflation gauge; Warsh is discussed as a policy figure. The buyback dip already proved short-lived once."',
  noteHead:'Why this matters',noteSub:'Data and personnel hit the same week as a 19-year 30Y weekly high. Hot PCE can cement 5.27%; Warsh tone can move long-end supply expectations. Buyback relief has already been erased once.',footer:'MACRO · PCE GDP · Warsh JH',brand:BE}},

{file:'nvda-6b-poolside-nemotron',symbol:'NVDA',
 ko:{title:'Nvidia, 스타트업 Poolside에 $6B · 직원 100명+ 합류 · Nemotron',heroIcon:'🧠',heroBig:'$6B',heroSub:'WSJ Robbie Whelan 2026.08.22: Nvidia가 Poolside에 $6B. 직원 100명+가 Nvidia로. Nemotron. DeepSeek·Kimi K3와 경쟁하는 미국 오픈웨이트 AI.',
  cards:[{icon:'💵',big:'$6B',mid:'Poolside 거래',sub:'WSJ 8/22'},{icon:'👥',big:'100+',mid:'인력 Nvidia 합류',sub:'스타트업 흡수'},{icon:'🇺🇸',big:'Nemotron',mid:'오픈웨이트',sub:'vs DeepSeek·Kimi'}],
  quote:'"WSJ Robbie Whelan(8/22)은 Nvidia가 스타트업 Poolside에 60억 달러를 쓴다고 했다. Poolside 직원 100명 이상이 Nvidia로 옮긴다. 목표는 Nemotron으로, 중국 DeepSeek·Kimi K3 같은 오픈웨이트 모델에 맞서는 미국 쪽 스택이다. 오픈웨이트는 가중치를 공개하는 AI 모델을 뜻한다."',
  noteHead:'왜 중요한가',noteSub:'칩 판매만으로 모델 경쟁을 못 막겠다는 신호로 읽힌다. 인력을 통째로 가져가면 연구 속도는 빨라지지만 반독점·스타트업 밸류 논쟁도 붙는다. 다음엔 Nemotron 공개 일정·라이선스 조건을 본다.',footer:'NVDA · $6B Poolside · Nemotron',brand:BK},
 en:{title:'Nvidia Spending $6B with Poolside · 100+ Staff Join · Nemotron',heroIcon:'🧠',heroBig:'$6B',heroSub:'WSJ Robbie Whelan Aug 22, 2026: Nvidia spending $6B with startup Poolside; 100+ employees to Nvidia; Nemotron; compete with DeepSeek / Kimi K3; US open-weight AI.',
  cards:[{icon:'💵',big:'$6B',mid:'Poolside deal',sub:'WSJ Aug 22'},{icon:'👥',big:'100+',mid:'Staff to Nvidia',sub:'Startup absorption'},{icon:'🇺🇸',big:'Nemotron',mid:'Open-weight',sub:'vs DeepSeek · Kimi'}],
  quote:'"WSJ’s Robbie Whelan (Aug 22) said Nvidia is spending $6B with startup Poolside. More than 100 employees move to Nvidia. The product frame is Nemotron, a US open-weight stack versus DeepSeek and Kimi K3. Open-weight means model weights are released."',
  noteHead:'Why this matters',noteSub:'Chip sales alone may not be enough to contest the model layer. Absorbing a team speeds research but invites antitrust and startup-valuation debate. Next: Nemotron release timing and license terms.',footer:'NVDA · $6B Poolside · Nemotron',brand:BE}},

{file:'nvda-ai-price-hike-15pct',symbol:'NVDA',
 ko:{title:'Nvidia AI 관련 가격 인상 15% 초과 (Bloomberg)',heroIcon:'💰',heroBig:'15%+',heroSub:'Evan / Bloomberg: AI 관련 가격 인상이 15%를 넘는다. 수요가 공급을 앞서는 구간에 단가 전가다.',
  cards:[{icon:'📈',big:'15%+',mid:'AI 관련 가격',sub:'Bloomberg'},{icon:'🔒',big:'락인',mid:'생태계 고착',sub:'고객 전환비용'},{icon:'⚡',big:'수요>공급',mid:'단가 전가',sub:'마진 방어'}],
  quote:'"Bloomberg 인용(Evan)은 Nvidia가 AI 관련 제품 가격을 15% 넘게 올린다고 했다. 데이터센터 GPU·네트워킹처럼 구하기 어려운 부품에서 단가를 올리는 그림이다. 고객은 대기열에 묶여 있어 대체재로 바로 못 빠진다."',
  noteHead:'왜 중요한가',noteSub:'물량 성장이 꺾여도 ASP(평균판매가)가 받쳐 주면 매출이 버틴다. 반대로 고객 CAPEX 삭감이 오면 인상분이 주문 취소로 돌아온다. Poolside $6B 지출과 같은 주 — 칩 파워와 모델 내재화를 같이 본다.',footer:'NVDA · AI Price Hike 15%+',brand:BK},
 en:{title:'Nvidia AI-Related Price Hikes More Than 15% (Bloomberg)',heroIcon:'💰',heroBig:'15%+',heroSub:'Evan / Bloomberg: AI-related price hikes of more than 15%. Passing through scarcity where demand still exceeds supply.',
  cards:[{icon:'📈',big:'15%+',mid:'AI-related prices',sub:'Bloomberg'},{icon:'🔒',big:'Lock-in',mid:'Ecosystem stickiness',sub:'Switching costs'},{icon:'⚡',big:'D>S',mid:'ASP pass-through',sub:'Margin defense'}],
  quote:'"Bloomberg via Evan said Nvidia is raising AI-related prices by more than 15%. That is ASP (average selling price) on scarce datacenter GPUs and networking. Customers wait in line, so they cannot switch overnight."',
  noteHead:'Why this matters',noteSub:'If unit growth slows, higher ASP can still hold revenue. If customers cut CAPEX, hikes become cancellations. Same week as the $6B Poolside spend — chip power plus in-house models.',footer:'NVDA · AI Price Hike 15%+',brand:BE}},

{file:'spcx-db-arr-981-neocloud',symbol:'SPCX',
 ko:{title:'Deutsche Bank: SpaceX 연말 ARR $31.3B→$98.1B · Neocloud $48B',heroIcon:'📡',heroBig:'$98.1B',heroSub:'Sam Badawi / DB: 연말 ARR 거의 3배, 대부분 Neocloud. 표 2Q26→Dec-26E($bn): Space 3.8→7.2 · Starlink 9.9→13.2 · Starshield+Ent 7.2→11.1 · Neocloud 6.4→48.0 · Cursor 0.0→12.0 · Ads 1.5→3.5 · Grok/X/Other 2.4→3.2 · Total 31.3→98.1. 출처 Company reports, Deutsche Bank Research.',
  cards:[{icon:'☁️',big:'$48B',mid:'Neocloud Dec-26E',sub:'6.4→48.0'},{icon:'⌨️',big:'$12B',mid:'Cursor Dec-26E',sub:'0→12'},{icon:'📊',big:'$98.1B',mid:'Total ARR',sub:'31.3→98.1'}],
  quote:'"Deutsche Bank 표는 SpaceX 그룹 ARR이 2분기 313억 달러에서 연말 추정 981억 달러로 거의 세 배가 된다고 한다. ARR은 연환산 구독·계약 매출이다. 증가분의 대부분은 Neocloud(6.4→48.0). Cursor는 0에서 120억, Starlink는 99→132억이다. 출처는 회사 공시와 DB Research."',
  noteHead:'왜 중요한가',noteSub:'상장 후 스토리가 발사체가 아니라 AI 클라우드·개발툴 구독으로 기울었다. 추정치라 수주·가동률이 안 나오면 숫자가 무너진다. 다음엔 Neocloud 실계약과 Cursor 매출 인식을 분기마다 대조한다.',footer:'SPCX · DB ARR $98.1B · Neocloud',brand:BK},
 en:{title:'Deutsche Bank: SpaceX Year-End ARR $31.3B→$98.1B · Neocloud $48B',heroIcon:'📡',heroBig:'$98.1B',heroSub:'Sam Badawi / DB: nearly triple ARR by year-end, mostly Neocloud. 2Q26→Dec-26E ($bn): Space 3.8→7.2; Starlink 9.9→13.2; Starshield+Ent 7.2→11.1; Neocloud 6.4→48.0; Cursor 0.0→12.0; Ads 1.5→3.5; Grok/X/Other 2.4→3.2; Total 31.3→98.1. Source: Company reports, Deutsche Bank Research.',
  cards:[{icon:'☁️',big:'$48B',mid:'Neocloud Dec-26E',sub:'6.4→48.0'},{icon:'⌨️',big:'$12B',mid:'Cursor Dec-26E',sub:'0→12'},{icon:'📊',big:'$98.1B',mid:'Total ARR',sub:'31.3→98.1'}],
  quote:'"Deutsche Bank’s table takes SpaceX-group ARR from $31.3B in 2Q26 to $98.1B by Dec-26E — nearly 3x. ARR is annualized recurring revenue. Most of the jump is Neocloud ($6.4B→$48.0B). Cursor goes $0→$12B; Starlink $9.9B→$13.2B. Source: company reports and DB Research."',
  noteHead:'Why this matters',noteSub:'The post-IPO story tilts from rockets to AI cloud and developer subscriptions. These are estimates — missed bookings unwind the number. Next: Neocloud contracts and Cursor recognition each quarter.',footer:'SPCX · DB ARR $98.1B · Neocloud',brand:BE}},

{file:'spcx-starlink-11040-sats',symbol:'SPCX',
 ko:{title:'Starlink 가동 위성 ~11,040기 · 다음 9개 LEO 합산의 5배+',heroIcon:'🛰️',heroBig:'11,040',heroSub:'DogeDesigner: 가동 Starlink ~11,040. 다음 9개 LEO 합 ~2,100, 5배 초과. 차트: Starlink 11040, OneWeb 651, Amazon Leo 392, Starshield 241, Xingwang 228, Qianfan 217, Planet 122, PWSA 90, Jilin 85, Iridium 81.',
  cards:[{icon:'🛰️',big:'11,040',mid:'Starlink 가동',sub:'DogeDesigner'},{icon:'📐',big:'~2,100',mid:'다음 9개 LEO 합',sub:'5배 초과'},{icon:'📦',big:'651',mid:'OneWeb 2위',sub:'격차 압도'}],
  quote:'"DogeDesigner 차트는 작동 중인 Starlink가 약 11,040기라고 적었다. 그다음 아홉 개 저궤도(LEO) 별자리를 다 더해도 약 2,100기다. OneWeb 651, Amazon Leo 392, Starshield 241 순이다. 커버리지·용량에서 경쟁 구도가 아직 비대칭이다."',
  noteHead:'왜 중요한가',noteSub:'위성 수가 곧 지연시간·대역·군용 용량의 바닥이다. DB ARR에서 Starlink는 99→132억으로 상대적으로 완만하다. 스케일은 이미 이겼고, 다음은 평균매출·군· ent 믹스다.',footer:'SPCX · Starlink 11,040',brand:BK},
 en:{title:'Starlink ~11,040 Working Sats · More Than 5× Next 9 LEO Combined',heroIcon:'🛰️',heroBig:'11,040',heroSub:'DogeDesigner: ~11,040 working Starlink sats; next 9 LEO combined ~2,100; >5×. Chart: Starlink 11040, OneWeb 651, Amazon Leo 392, Starshield 241, Xingwang 228, Qianfan 217, Planet 122, PWSA 90, Jilin 85, Iridium 81.',
  cards:[{icon:'🛰️',big:'11,040',mid:'Starlink working',sub:'DogeDesigner'},{icon:'📐',big:'~2,100',mid:'Next 9 LEO sum',sub:'More than 5×'},{icon:'📦',big:'651',mid:'OneWeb #2',sub:'Gap remains huge'}],
  quote:'"DogeDesigner’s chart lists about 11,040 working Starlink satellites. The next nine LEO constellations combined are about 2,100. OneWeb 651, Amazon Leo 392, Starshield 241. Coverage and capacity are still asymmetric."',
  noteHead:'Why this matters',noteSub:'Sat count is the floor for latency, bandwidth, and military capacity. In the DB ARR table Starlink only goes $9.9B→$13.2B — scale is already won; mix and ARPU are the next debate.',footer:'SPCX · Starlink 11,040',brand:BE}},

{file:'spcx-flt14-ship41-propellant',symbol:'SPCX',
 ko:{title:'Starship Flight 14 · Ship 41 추진제 ~1,000–1,100t · 궤도·재진입',heroIcon:'🚀',heroBig:'Ship 41',heroSub:'Cosmos Europa: F14가 F13보다 어렵다. Ship 41: 궤도속도 ~7.8km/s, 완전 궤도, 재진입, 잔여 추진제. 적재 ~1,000–1,100t vs Ship 40 ~800–900t. (08-22 NET 9/15과 교차).',
  cards:[{icon:'🚀',big:'F14',mid:'F13보다 난이도↑',sub:'Cosmos Europa'},{icon:'⛽',big:'1,000–1,100t',mid:'Ship 41 적재',sub:'vs 40호 800–900t'},{icon:'🌍',big:'7.8km/s',mid:'궤도·재진입',sub:'잔여 추진제'}],
  quote:'"Cosmos Europa는 Flight 14가 13보다 어렵다고 했다. Ship 41은 초속 약 7.8km로 궤도에 들어가 한 바퀴 돌고 재진입하며, 추진제를 남긴다. 추진제 적재는 약 1,000–1,100톤으로 Ship 40의 800–900톤보다 많다. 08-22 리포트의 NET 9월 15일과 같은 비행축이다."',
  noteHead:'왜 중요한가',noteSub:'탱크를 더 채우는 것은 페이로드·재사용 마진을 키우는 실험이다. 실패하면 NET 날짜가 밀리고 Starlink 대량 배치 신뢰도가 흔들린다. 성공하면 11,040기 이후 배치 속도 논거가 살아난다.',footer:'SPCX · FLT-14 Ship 41',brand:BK},
 en:{title:'Starship Flight 14 · Ship 41 Propellant ~1,000–1,100t · Orbit and Reentry',heroIcon:'🚀',heroBig:'Ship 41',heroSub:'Cosmos Europa: F14 harder than F13. Ship 41: orbital velocity ~7.8 km/s, full orbit, reentry, leftover propellant; load ~1,000–1,100 t vs Ship 40 ~800–900 t. Cross-link 08-22 NET Sep 15.',
  cards:[{icon:'🚀',big:'F14',mid:'Harder than F13',sub:'Cosmos Europa'},{icon:'⛽',big:'1,000–1,100t',mid:'Ship 41 load',sub:'vs 40: 800–900t'},{icon:'🌍',big:'7.8 km/s',mid:'Orbit + reentry',sub:'Leftover propellant'}],
  quote:'"Cosmos Europa said Flight 14 is harder than 13. Ship 41 reaches ~7.8 km/s, completes an orbit, reenters, and keeps leftover propellant. Load is ~1,000–1,100 t versus Ship 40’s ~800–900 t. Same flight axis as the 08-22 NET September 15 note."',
  noteHead:'Why this matters',noteSub:'A fuller tank is a test of payload and reuse margin. Failure slips the NET date and Starlink mass-deployment confidence. Success supports the cadence story after 11,040 sats.',footer:'SPCX · FLT-14 Ship 41',brand:BE}},

{file:'spcx-natgas-trading-desk',symbol:'SPCX',
 ko:{title:'SpaceX 천연가스 트레이딩 데스크 채용 · Starship 메탄·전력',heroIcon:'⛽',heroBig:'Natgas',heroSub:'Joe Hansen: 실물+금융 천연가스 트레이더 채용. Starship 메탄 + Starlink/칩 전력. 근무지 Starbase TX 또는 Cape Canaveral. 파이프라인·액화·가스플랜트 — Terafab용.',
  cards:[{icon:'🧑‍💼',big:'채용',mid:'physical+financial',sub:'Joe Hansen'},{icon:'🔥',big:'메탄',mid:'Starship 추진제',sub:'+ 전력 수요'},{icon:'📍',big:'TX/FL',mid:'Starbase 또는 Cape',sub:'Terafab 연계'}],
  quote:'"Joe Hansen은 SpaceX가 천연가스 트레이더를 뽑는다고 했다. 실물 가스와 금융 헤지를 같이 다룬다. 용도는 Starship 메탄 추진제와 Starlink·칩 공장 전력이다. 근무지는 텍사스 Starbase 또는 케이프 커내버럴. 파이프라인·액화·가스발전은 Terafab(초대형 팹) 전력과 맞닿는다."',
  noteHead:'왜 중요한가',noteSub:'발사체 회사가 에너지 트레이딩 데스크를 두는 것은 연료·전력이 원가의 핵심이 됐다는 뜻이다. DB Neocloud $48B 가정과도 맞물린다. 다음엔 계약 규모·Hedging 손익이 실적에 보이는지 본다.',footer:'SPCX · Natgas Trading Desk',brand:BK},
 en:{title:'SpaceX Hiring Natgas Trader · Starship Methane and Power',heroIcon:'⛽',heroBig:'Natgas',heroSub:'Joe Hansen: hiring physical+financial natgas trader for Starship methane + Starlink/chip power; Starbase TX or Cape Canaveral; pipelines/liquefaction/gas plants for Terafab.',
  cards:[{icon:'🧑‍💼',big:'Hiring',mid:'Physical + financial',sub:'Joe Hansen'},{icon:'🔥',big:'Methane',mid:'Starship propellant',sub:'+ power demand'},{icon:'📍',big:'TX/FL',mid:'Starbase or Cape',sub:'Terafab link'}],
  quote:'"Joe Hansen said SpaceX is hiring a natural-gas trader for physical supply and financial hedges. Use cases: Starship methane and power for Starlink/chip sites. Location: Starbase, TX or Cape Canaveral. Pipelines, liquefaction, and gas plants tie to Terafab-scale power."',
  noteHead:'Why this matters',noteSub:'A launch company standing up an energy desk means fuel and power are now core costs. It rhymes with DB’s $48B Neocloud assumption. Next: contract size and whether hedge P&L shows up in results.',footer:'SPCX · Natgas Trading Desk',brand:BE}},

{file:'trump-spcx-purchase-15k-50k',symbol:'SPCX',
 ko:{title:'Trump SPCX 매수 $15,001–$50,000 · 6/23 거래·8/22 공시',heroIcon:'🏛️',heroBig:'$15–50k',heroSub:'정치인 Donald Trump 공시: Purchase $15,001–$50,000 SPCX. 거래일 2026.06.23, 공시 2026.08.22. 위젯 SPCX ~$136.97 +2.22%.',
  cards:[{icon:'📝',big:'매수',mid:'$15,001–$50,000',sub:'범위 공시'},{icon:'📅',big:'6/23',mid:'거래일',sub:'공시 8/22'},{icon:'📈',big:'$136.97',mid:'위젯 +2.22%',sub:'당일 화면'}],
  quote:'"공시 카드는 Donald Trump가 SPCX를 15,001–50,000달러 구간에 매수했다고 적었다. 미국 공직자 보고는 정확한 주수가 아니라 금액 밴드를 쓴다. 거래일은 2026년 6월 23일, 공시는 8월 22일이다. 같은 화면 위젯은 SPCX 약 136.97달러(+2.22%)."',
  noteHead:'왜 중요한가',noteSub:'상장 직후 락업·변동성 구간에 고위 정치인 매수가 공시됐다. 금액 상한이 5만 달러라 시세를 움직이는 규모는 아니다.  symbology·이해충돌 논쟁은 별도로, 수급 신호로 과대해석하지 않는다.',footer:'SPCX · Trump Purchase Band',brand:BK},
 en:{title:'Trump SPCX Purchase $15,001–$50,000 · Trade Jun 23 · Disclose Aug 22',heroIcon:'🏛️',heroBig:'$15–50k',heroSub:'Politician Donald Trump: Purchase $15,001–$50,000 SPCX; trade Jun 23, 2026; disclose Aug 22, 2026. Widget SPCX ~$136.97 +2.22%.',
  cards:[{icon:'📝',big:'Buy',mid:'$15,001–$50,000',sub:'Range disclosure'},{icon:'📅',big:'Jun 23',mid:'Trade date',sub:'Filed Aug 22'},{icon:'📈',big:'$136.97',mid:'Widget +2.22%',sub:'Same screen'}],
  quote:'"The filing card shows Donald Trump purchased SPCX in the $15,001–$50,000 band. US official reports use ranges, not share counts. Trade date June 23, 2026; disclosed August 22. The widget on the same screen showed SPCX about $136.97 (+2.22%)."',
  noteHead:'Why this matters',noteSub:'A senior politician’s buy hit the tape in the post-IPO lockup/vol window. The $50k cap is not market-moving size. Treat conflict-of-interest debate separately — do not read it as a flow signal.',footer:'SPCX · Trump Purchase Band',brand:BE}},
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
